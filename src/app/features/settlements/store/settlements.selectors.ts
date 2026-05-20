import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SettlementConfirmationAction} from '@core/models/settlement-confirmation-action.enum';
import {SettlementEntry} from '@core/models/settlement-entry.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SortField} from '@core/models/sort-field.enum';
import {ConfirmDialogTone} from '@shared/models/types/confirm-dialog-tone.type';
import {
  calculateGroupTotals,
  calculateSummary,
  getEntryRemainingAmount,
  matchesStatusFilter,
  matchesTypeFilter,
} from '../utils/settlement-calculations.util';
import {SETTLEMENTS_FEATURE_KEY, SettlementsState} from './settlements.state';

export const selectSettlementsState =
  createFeatureSelector<SettlementsState>(SETTLEMENTS_FEATURE_KEY);

export const selectAllGroups = createSelector(
  selectSettlementsState,
  (state) => state.groups
);

export const selectFilters = createSelector(
  selectSettlementsState,
  (state) => state.filters
);

export const selectUi = createSelector(selectSettlementsState, (state) => state.ui);

export const selectLoading = createSelector(
  selectSettlementsState,
  (state) => state.loading
);

export const selectSaving = createSelector(
  selectSettlementsState,
  (state) => state.saving
);

export const selectError = createSelector(selectSettlementsState, (state) => state.error);

export const selectShowNewGroupForm = createSelector(
  selectUi,
  (ui) => ui.showNewGroupForm
);

export const selectAddingEntryGroupId = createSelector(
  selectUi,
  (ui) => ui.addingEntryGroupId
);

export const selectConfirmation = createSelector(selectUi, (ui) => ui.confirmation);

export const selectExpandedEntryIds = createSelector(
  selectUi,
  (ui) => ui.expandedEntryIds
);

function sortEntries(entries: SettlementEntry[], sort: SortField): SettlementEntry[] {
  const sorted: SettlementEntry[] = [...entries];
  switch (sort) {
    case SortField.Amount:
      return sorted.sort((a, b) => b.totalAmount - a.totalAmount);
    case SortField.Name:
      return sorted.sort((a, b) => a.personName.localeCompare(b.personName, 'pl'));
    case SortField.Date:
    default:
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }
}

function filterEntries(
  entries: readonly SettlementEntry[],
  filters: SettlementsState['filters']
): SettlementEntry[] {
  return entries.filter(
    (e) =>
      matchesTypeFilter(e, filters.type) && matchesStatusFilter(e, filters.status)
  );
}

export interface FilteredSettlementGroup extends SettlementGroup {
  readonly filteredEntries: readonly SettlementEntry[];
  readonly totals: ReturnType<typeof calculateGroupTotals>;
}

export const selectFilteredGroups = createSelector(
  selectAllGroups,
  selectFilters,
  (groups, filters): FilteredSettlementGroup[] =>
    groups.map((group) => {
      const filteredEntries: SettlementEntry[] = sortEntries(
        filterEntries(group.entries, filters),
        filters.sort
      );
      return {
        ...group,
        filteredEntries,
        totals: calculateGroupTotals(group.entries),
      };
    })
);

export const selectSummary = createSelector(selectAllGroups, (groups) =>
  calculateSummary(groups)
);

export interface ConfirmationDialogViewModel {
  readonly open: boolean;
  readonly title: string;
  readonly message: string;
  readonly confirmLabel: string;
  readonly tone: ConfirmDialogTone;
  readonly iconName: string;
  readonly groupId: string;
  readonly entryId?: string;
  readonly action: SettlementConfirmationAction;
}

export const selectConfirmationDialog = createSelector(
  selectConfirmation,
  (confirmation): ConfirmationDialogViewModel | null => {
    if (!confirmation) {
      return null;
    }

    switch (confirmation.action) {
      case SettlementConfirmationAction.DeleteGroup:
        return {
          open: true,
          action: confirmation.action,
          groupId: confirmation.groupId,
          title: 'Usuń grupę?',
          message: 'Wszystkie wpisy w grupie zostaną trwale usunięte.',
          confirmLabel: 'Usuń',
          tone: 'danger',
          iconName: 'heroExclamationTriangle',
        };
      case SettlementConfirmationAction.DeleteEntry:
        return {
          open: true,
          action: confirmation.action,
          groupId: confirmation.groupId,
          entryId: confirmation.entryId,
          title: 'Usuń wpis?',
          message: confirmation.personName
            ? `Wpis „${confirmation.personName}” zostanie trwale usunięty.`
            : 'Ten wpis zostanie trwale usunięty.',
          confirmLabel: 'Usuń',
          tone: 'danger',
          iconName: 'heroTrash',
        };
      case SettlementConfirmationAction.ArchiveEntry:
        return {
          open: true,
          action: confirmation.action,
          groupId: confirmation.groupId,
          entryId: confirmation.entryId,
          title: 'Archiwizuj wpis?',
          message: confirmation.personName
            ? `Wpis „${confirmation.personName}” trafi do archiwum.`
            : 'Ten wpis trafi do archiwum.',
          confirmLabel: 'Archiwizuj',
          tone: 'warning',
          iconName: 'heroArchiveBox',
        };
      default:
        return null;
    }
  }
);
