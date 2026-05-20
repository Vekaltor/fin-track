import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateEntryPayload} from '@core/models/create-entry-payload.interface';
import {CreateGroupPayload} from '@core/models/create-group-payload.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SettlementsService} from './settlements-service';

@Injectable({providedIn: 'root'})
export class SettlementsApiService extends SettlementsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'http://localhost:3000/settlements';

  public override loadGroups(): Observable<readonly SettlementGroup[]> {
    return this.http.get<SettlementGroup[]>(`${this.apiUrl}/groups`);
  }

  public override createGroup(payload: CreateGroupPayload): Observable<SettlementGroup> {
    return this.http.post<SettlementGroup>(`${this.apiUrl}/groups`, payload);
  }

  public override deleteGroup(groupId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/groups/${groupId}`);
  }

  public override createEntry(payload: CreateEntryPayload): Observable<SettlementGroup> {
    return this.http.post<SettlementGroup>(
      `${this.apiUrl}/groups/${payload.groupId}/entries`,
      payload
    );
  }

  public override deleteEntry(groupId: string, entryId: string): Observable<SettlementGroup> {
    return this.http.delete<SettlementGroup>(
      `${this.apiUrl}/groups/${groupId}/entries/${entryId}`
    );
  }

  public override payInstallment(
    groupId: string,
    entryId: string,
    installmentId: string
  ): Observable<SettlementGroup> {
    return this.http.post<SettlementGroup>(
      `${this.apiUrl}/groups/${groupId}/entries/${entryId}/installments/${installmentId}/pay`,
      {}
    );
  }

  public override archiveEntry(groupId: string, entryId: string): Observable<SettlementGroup> {
    return this.http.post<SettlementGroup>(
      `${this.apiUrl}/groups/${groupId}/entries/${entryId}/archive`,
      {}
    );
  }
}
