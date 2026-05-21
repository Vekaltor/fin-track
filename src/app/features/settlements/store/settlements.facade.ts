import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {SettlementConfirmationAction} from '@core/models/settlement-confirmation-action.enum';
import {CreateEntryPayload} from '@core/models/create-entry-payload.interface';
import {CreateGroupPayload} from '@core/models/create-group-payload.interface';
import {SortField} from '@core/models/sort-field.enum';
import {StatusFilter} from '@core/models/status-filter.enum';
import {TypeFilter} from '@core/models/type-filter.enum';
import {SettlementsActions} from './settlements.actions';
import {
  selectAddingEntryGroupId,
  selectConfirmationDialog,
  selectError,
  selectExpandedEntryIds,
  selectFilteredGroups,
  selectFilters,
  selectLoading,
  selectSaving,
  selectShowNewGroupForm,
  selectSummary,
} from './settlements.selectors';

@Injectable()
export class SettlementsFacade {
  private readonly store: Store = inject(Store);

  public readonly groups$ = this.store.select(selectFilteredGroups);
  public readonly summary$ = this.store.select(selectSummary);
  public readonly filters$ = this.store.select(selectFilters);
  public readonly loading$ = this.store.select(selectLoading);
  public readonly saving$ = this.store.select(selectSaving);
  public readonly error$ = this.store.select(selectError);
  public readonly showNewGroupForm$ = this.store.select(selectShowNewGroupForm);
  public readonly addingEntryGroupId$ = this.store.select(selectAddingEntryGroupId);
  public readonly confirmationDialog$ = this.store.select(selectConfirmationDialog);
  public readonly expandedEntryIds$ = this.store.select(selectExpandedEntryIds);

  public loadGroups(): void {
    this.store.dispatch(SettlementsActions.loadGroups());
  }

  public setTypeFilter(filter: TypeFilter): void {
    this.store.dispatch(SettlementsActions.setTypeFilter({filter}));
  }

  public setStatusFilter(filter: StatusFilter): void {
    this.store.dispatch(SettlementsActions.setStatusFilter({filter}));
  }

  public setSortField(sort: SortField): void {
    this.store.dispatch(SettlementsActions.setSortField({sort}));
  }

  public showNewGroupForm(): void {
    this.store.dispatch(SettlementsActions.showNewGroupForm());
  }

  public hideNewGroupForm(): void {
    this.store.dispatch(SettlementsActions.hideNewGroupForm());
  }

  public createGroup(payload: CreateGroupPayload): void {
    this.store.dispatch(SettlementsActions.createGroup({payload}));
  }

  public openDeleteGroupConfirmation(groupId: string, groupName: string): void {
    this.store.dispatch(
      SettlementsActions.openConfirmation({
        action: SettlementConfirmationAction.DELETE_GROUP,
        groupId,
        groupName,
      })
    );
  }

  public openDeleteEntryConfirmation(
    groupId: string,
    entryId: string,
    personName: string
  ): void {
    this.store.dispatch(
      SettlementsActions.openConfirmation({
        action: SettlementConfirmationAction.DELETE_ENTRY,
        groupId,
        entryId,
        personName,
      })
    );
  }

  public openArchiveEntryConfirmation(
    groupId: string,
    entryId: string,
    personName: string
  ): void {
    this.store.dispatch(
      SettlementsActions.openConfirmation({
        action: SettlementConfirmationAction.ARCHIVE_ENTRY,
        groupId,
        entryId,
        personName,
      })
    );
  }

  public closeConfirmation(): void {
    this.store.dispatch(SettlementsActions.closeConfirmation());
  }

  public confirmDialogAction(groupId: string, entryId?: string, action?: SettlementConfirmationAction): void {
    const resolvedAction: SettlementConfirmationAction | undefined = action;
    if (!resolvedAction) {
      return;
    }
    switch (resolvedAction) {
      case SettlementConfirmationAction.DELETE_GROUP:
        this.store.dispatch(SettlementsActions.deleteGroup({groupId}));
        break;
      case SettlementConfirmationAction.DELETE_ENTRY:
        if (entryId) {
          this.store.dispatch(SettlementsActions.deleteEntry({groupId, entryId}));
        }
        break;
      case SettlementConfirmationAction.ARCHIVE_ENTRY:
        if (entryId) {
          this.store.dispatch(SettlementsActions.archiveEntry({groupId, entryId}));
        }
        break;
    }
  }

  public showAddEntryForm(groupId: string): void {
    this.store.dispatch(SettlementsActions.showAddEntryForm({groupId}));
  }

  public hideAddEntryForm(): void {
    this.store.dispatch(SettlementsActions.hideAddEntryForm());
  }

  public createEntry(payload: CreateEntryPayload): void {
    this.store.dispatch(SettlementsActions.createEntry({payload}));
  }

  public toggleEntryExpanded(entryId: string): void {
    this.store.dispatch(SettlementsActions.toggleEntryExpanded({entryId}));
  }

  public payInstallments(
    groupId: string,
    entryId: string,
    installmentIds: readonly string[]
  ): void {
    if (installmentIds.length === 0) {
      return;
    }
    this.store.dispatch(
      SettlementsActions.payInstallments({groupId, entryId, installmentIds})
    );
  }
}
