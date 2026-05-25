import {createReducer, on} from '@ngrx/store';
import {SettlementsPageActions} from './settlements-page.actions';
import {SettlementsApiActions} from './settlements-api.actions';
import {initialSettlementsState} from './settlements.state';
import {SettlementsState} from '@features/settlements/models/settlements-state.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';

export const settlementsReducer = createReducer(
  initialSettlementsState,

  on(
    SettlementsPageActions.loadGroups,
    SettlementsPageActions.createGroup,
    SettlementsPageActions.deleteGroup,
    SettlementsPageActions.createEntry,
    SettlementsPageActions.deleteEntry,
    SettlementsPageActions.payInstallments,
    SettlementsPageActions.archiveEntry, (state): SettlementsState => ({
      ...state,
      error: null,
    })),

  on(SettlementsApiActions.loadGroupsSuccess, (state, {groups}): SettlementsState => ({
    ...state,
    groups,
  })),

  on(SettlementsPageActions.setTypeFilter, (state, {filter}): SettlementsState => ({
    ...state,
    filters: {...state.filters, type: filter},
  })),

  on(SettlementsPageActions.setStatusFilter, (state, {filter}): SettlementsState => ({
    ...state,
    filters: {...state.filters, status: filter},
  })),

  on(SettlementsPageActions.setSortField, (state, {sort}): SettlementsState => ({
    ...state,
    filters: {...state.filters, sort},
  })),

  on(SettlementsApiActions.createGroupSuccess, (state, {group}): SettlementsState => ({
    ...state,
    groups: [...state.groups, group],
  })),

  on(SettlementsApiActions.deleteGroupSuccess, (state, {groupId}): SettlementsState => ({
    ...state,
    groups: state.groups.filter((g: SettlementGroup) => g.id !== groupId),
  })),

  on(
    SettlementsApiActions.createEntrySuccess,
    SettlementsApiActions.deleteEntrySuccess,
    SettlementsApiActions.payInstallmentsSuccess,
    SettlementsApiActions.archiveEntrySuccess,
    (state, {group}): SettlementsState => ({
      ...state,
      groups: state.groups.map((g: SettlementGroup): SettlementGroup => (g.id === group.id ? group : g)),
    })
  ),

  on(
    SettlementsApiActions.loadGroupsFailure,
    SettlementsApiActions.createGroupFailure,
    SettlementsApiActions.deleteGroupFailure,
    SettlementsApiActions.createEntryFailure,
    SettlementsApiActions.deleteEntryFailure,
    SettlementsApiActions.payInstallmentsFailure,
    SettlementsApiActions.archiveEntryFailure,
    (state, {error}): SettlementsState => ({
      ...state,
      error,
    })
  ),
);
