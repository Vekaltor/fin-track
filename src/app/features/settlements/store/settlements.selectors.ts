import {createFeatureSelector, createSelector} from '@ngrx/store';
import {calculateGroupTotals, calculateSummary} from '@features/settlements/helpers/settlement-calculations';
import {filterSettlements} from '@features/settlements/helpers/filter-settlements';
import {sortSettlements} from '@features/settlements/helpers/sort-settlements';
import {SETTLEMENTS_FEATURE_KEY} from './settlements.state';
import {SettlementsState} from '@features/settlements/models/settlements-state.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SettlementsFilters} from '@features/settlements/models/settlements-filters.interface';
import {SettlementsSummary} from '@features/settlements/models/settlements-summary.interface';
import {FilteredSettlementGroup} from '@features/settlements/models/filtered-settlement-group.interface';
import {GroupWithFilteredSettlements} from '@features/settlements/models/group-with-filtered-settlements.interface';
import {SortField} from '@features/settlements/models/sort-field.enum';

// --- state ---

export const selectSettlementsState =
  createFeatureSelector<SettlementsState>(SETTLEMENTS_FEATURE_KEY);

// --- primitive ---

export const selectAllGroups = createSelector(
  selectSettlementsState,
  (state): SettlementGroup[] => state.groups
);


export const selectFilters = createSelector(
  selectSettlementsState,
  (state): SettlementsFilters => state.filters
);

export const selectSortField = createSelector(selectFilters, (f): SortField => f.sort);

export const selectError = createSelector(
  selectSettlementsState,
  (state): string | null => state.error
);

// --- private derived ---

const _selectGroupsFiltered = createSelector(
  selectAllGroups,
  selectFilters,
  (groups, filters): GroupWithFilteredSettlements[] =>
    groups.map((group) => ({
      ...group,
      filteredSettlements: filterSettlements(group.entries, filters),
    }))
);

const _selectGroupsFilteredAndSorted = createSelector(
  _selectGroupsFiltered,
  selectSortField,
  (groups, sort): GroupWithFilteredSettlements[] =>
    groups.map((group) => ({
      ...group,
      filteredSettlements: sortSettlements(group.filteredSettlements, sort),
    }))
);

// --- public derived ---

export const selectFilteredGroups = createSelector(
  _selectGroupsFilteredAndSorted,
  (groups): FilteredSettlementGroup[] =>
    groups.map((group) => ({
      ...group,
      totals: calculateGroupTotals(group.filteredSettlements),
    }))
);

export const selectSummary = createSelector(
  selectAllGroups,
  (groups): SettlementsSummary => calculateSummary(groups)
);

// --- view model ---

export const selectSettlementsPageViewModel = createSelector(
  selectFilteredGroups,
  selectSummary,
  selectFilters,
  selectError,
  (groups, summary, filters, error) => ({
    groups,
    summary,
    filters,
    error,
  })
);
