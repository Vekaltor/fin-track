import {inject, Injectable, Signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {CreateSettlementEntryPayload} from '@core/models/create-settlement-entry-payload.interface';
import {CreateSettlementGroupPayload} from '@core/models/create-settlement-group-payload.interface';
import {SortField} from '@features/settlements/models/sort-field.enum';
import {StatusFilter} from '@features/settlements/models/status-filter.enum';
import {TypeFilter} from '@features/settlements/models/type-filter.enum';
import {SettlementsPageActions} from './settlements-page.actions';
import {selectSettlementsPageViewModel} from './settlements.selectors';
import {SETTLEMENT_OPERATIONS} from '@core/constants/settlements-operations';
import {LoadingService} from '@core/services/loading-service';

@Injectable()
export class SettlementsFacade {
  private readonly store: Store = inject(Store);
  private readonly loadingService: LoadingService = inject(LoadingService);

  public readonly vm$ = this.store.select(selectSettlementsPageViewModel);

  public readonly isSomeLoading: Signal<boolean> = this.loadingService.isLoading;

  public readonly isLoadingGroups: Signal<boolean> = this.loadingService.isPending(SETTLEMENT_OPERATIONS.LOAD_GROUPS);

  public readonly isPayingInstallments: Signal<boolean> = this.loadingService.isPending(SETTLEMENT_OPERATIONS.PAY_INSTALLMENTS);

  public readonly isSaving: Signal<boolean> = this.loadingService.isSomeOfPending([
    SETTLEMENT_OPERATIONS.CREATE_ENTRY, SETTLEMENT_OPERATIONS.CREATE_GROUP
  ]);

  public loadGroups(): void {
    this.store.dispatch(SettlementsPageActions.loadGroups());
  }

  public setTypeFilter(filter: TypeFilter): void {
    this.store.dispatch(SettlementsPageActions.setTypeFilter({filter}));
  }

  public setStatusFilter(filter: StatusFilter): void {
    this.store.dispatch(SettlementsPageActions.setStatusFilter({filter}));
  }

  public setSortField(sort: SortField): void {
    this.store.dispatch(SettlementsPageActions.setSortField({sort}));
  }

  public createGroup(payload: CreateSettlementGroupPayload): void {
    this.store.dispatch(SettlementsPageActions.createGroup({payload}));
  }

  public deleteGroup(groupId: string): void {
    this.store.dispatch(SettlementsPageActions.deleteGroup({groupId}));
  }

  public createSettlement(payload: CreateSettlementEntryPayload): void {
    this.store.dispatch(SettlementsPageActions.createEntry({payload}));
  }

  public deleteSettlement(groupId: string, entryId: string): void {
    this.store.dispatch(SettlementsPageActions.deleteEntry({groupId, entryId}));
  }

  public payInstallments(groupId: string, entryId: string, installmentIds: string[]): void {
    if (installmentIds.length === 0) return;
    this.store.dispatch(SettlementsPageActions.payInstallments({groupId, entryId, installmentIds}));
  }

  public archiveSettlement(groupId: string, entryId: string): void {
    this.store.dispatch(SettlementsPageActions.archiveEntry({groupId, entryId}));
  }
}
