import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CreateEntryPayload} from '@core/models/create-entry-payload.interface';
import {CreateGroupPayload} from '@core/models/create-group-payload.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';

@Injectable()
export abstract class SettlementsService {
  public abstract loadGroups(): Observable<readonly SettlementGroup[]>;

  public abstract createGroup(payload: CreateGroupPayload): Observable<SettlementGroup>;

  public abstract deleteGroup(groupId: string): Observable<void>;

  public abstract createEntry(payload: CreateEntryPayload): Observable<SettlementGroup>;

  public abstract deleteEntry(groupId: string, entryId: string): Observable<SettlementGroup>;

  public abstract payInstallment(
    groupId: string,
    entryId: string,
    installmentId: string
  ): Observable<SettlementGroup>;

  public abstract archiveEntry(groupId: string, entryId: string): Observable<SettlementGroup>;
}
