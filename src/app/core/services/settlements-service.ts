import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CreateSettlementEntryPayload} from '@core/models/create-settlement-entry-payload.interface';
import {CreateSettlementGroupPayload} from '@core/models/create-settlement-group-payload.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';

@Injectable()
export abstract class SettlementsService {
  public abstract loadGroups(): Observable<SettlementGroup[]>;

  public abstract createGroup(payload: CreateSettlementGroupPayload): Observable<SettlementGroup>;

  public abstract deleteGroup(groupId: string): Observable<void>;

  public abstract createEntry(payload: CreateSettlementEntryPayload): Observable<SettlementGroup>;

  public abstract deleteEntry(groupId: string, entryId: string): Observable<SettlementGroup>;

  public abstract payInstallments(
    groupId: string,
    entryId: string,
    installmentIds: readonly string[]
  ): Observable<SettlementGroup>;

  public abstract archiveEntry(groupId: string, entryId: string): Observable<SettlementGroup>;
}
