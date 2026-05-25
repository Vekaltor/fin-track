import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateSettlementEntryPayload} from '@core/models/create-settlement-entry-payload.interface';
import {CreateSettlementGroupPayload} from '@core/models/create-settlement-group-payload.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SettlementsService} from './settlements-service';
import {withOperationId} from '@core/helpers/with-operation-id';
import {SETTLEMENT_OPERATIONS} from '@core/constants/settlements-operations';

@Injectable({providedIn: 'root'})
export class SettlementsApiService extends SettlementsService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = 'http://localhost:3000/settlements';

  public override loadGroups(): Observable<SettlementGroup[]> {
    return this.http.get<SettlementGroup[]>(`${this.apiUrl}/groups`, {
      context: withOperationId(SETTLEMENT_OPERATIONS.LOAD_GROUPS)
    });
  }

  public override createGroup(payload: CreateSettlementGroupPayload): Observable<SettlementGroup> {
    return this.http.post<SettlementGroup>(`${this.apiUrl}/groups`, payload, {
      context: withOperationId(SETTLEMENT_OPERATIONS.CREATE_GROUP),
    });
  }

  public override deleteGroup(groupId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/groups/${groupId}`, {
      context: withOperationId(SETTLEMENT_OPERATIONS.DELETE_GROUP),
    });
  }

  public override createEntry(payload: CreateSettlementEntryPayload): Observable<SettlementGroup> {
    return this.http.post<SettlementGroup>(
      `${this.apiUrl}/groups/${payload.groupId}/entries`,
      payload,
      {context: withOperationId(SETTLEMENT_OPERATIONS.CREATE_ENTRY)}
    );
  }

  public override deleteEntry(groupId: string, entryId: string): Observable<SettlementGroup> {
    return this.http.delete<SettlementGroup>(
      `${this.apiUrl}/groups/${groupId}/entries/${entryId}`,
      {context: withOperationId(SETTLEMENT_OPERATIONS.DELETE_ENTRY)}
    );
  }

  public override payInstallments(
    groupId: string,
    entryId: string,
    installmentIds: string[]
  ): Observable<SettlementGroup> {
    return this.http.post<SettlementGroup>(
      `${this.apiUrl}/groups/${groupId}/entries/${entryId}/installments/pay`,
      {installmentIds},
      {context: withOperationId(SETTLEMENT_OPERATIONS.PAY_INSTALLMENTS)}
    );
  }

  public override archiveEntry(groupId: string, entryId: string): Observable<SettlementGroup> {
    return this.http.post<SettlementGroup>(
      `${this.apiUrl}/groups/${groupId}/entries/${entryId}/archive`,
      {},
      {context: withOperationId(SETTLEMENT_OPERATIONS.ARCHIVE_ENTRY)}
    );
  }
}
