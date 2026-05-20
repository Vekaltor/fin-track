import {createReducer, on} from '@ngrx/store';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SettlementsActions} from './settlements.actions';
import {initialSettlementsState, SettlementsState} from './settlements.state';

function replaceGroup(
  groups: readonly SettlementGroup[],
  updated: SettlementGroup
): SettlementGroup[] {
  return groups.map((g) => (g.id === updated.id ? updated : g));
}

function removeGroup(groups: readonly SettlementGroup[], groupId: string): SettlementGroup[] {
  return groups.filter((g) => g.id !== groupId);
}

function closeConfirmationUi(state: SettlementsState): SettlementsState['ui'] {
  return {...state.ui, confirmation: null};
}

export const settlementsReducer = createReducer(
  initialSettlementsState,

  on(SettlementsActions.loadGroups, (state): SettlementsState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(SettlementsActions.loadGroupsSuccess, (state, {groups}): SettlementsState => ({
    ...state,
    groups,
    loading: false,
  })),

  on(SettlementsActions.loadGroupsFailure, (state, {error}): SettlementsState => ({
    ...state,
    loading: false,
    error,
  })),

  on(SettlementsActions.setTypeFilter, (state, {filter}): SettlementsState => ({
    ...state,
    filters: {...state.filters, type: filter},
  })),

  on(SettlementsActions.setStatusFilter, (state, {filter}): SettlementsState => ({
    ...state,
    filters: {...state.filters, status: filter},
  })),

  on(SettlementsActions.setSortField, (state, {sort}): SettlementsState => ({
    ...state,
    filters: {...state.filters, sort},
  })),

  on(SettlementsActions.showNewGroupForm, (state): SettlementsState => ({
    ...state,
    ui: {...state.ui, showNewGroupForm: true, addingEntryGroupId: null},
  })),

  on(SettlementsActions.hideNewGroupForm, (state): SettlementsState => ({
    ...state,
    ui: {...state.ui, showNewGroupForm: false},
  })),

  on(
    SettlementsActions.createGroup,
    SettlementsActions.deleteGroup,
    SettlementsActions.createEntry,
    SettlementsActions.deleteEntry,
    SettlementsActions.payInstallment,
    SettlementsActions.archiveEntry,
    (state): SettlementsState => ({...state, saving: true, error: null})
  ),

  on(SettlementsActions.createGroupSuccess, (state, {group}): SettlementsState => ({
    ...state,
    groups: [...state.groups, group],
    saving: false,
    ui: {...state.ui, showNewGroupForm: false},
  })),

  on(SettlementsActions.createGroupFailure, (state, {error}): SettlementsState => ({
    ...state,
    saving: false,
    error,
  })),

  on(SettlementsActions.openConfirmation, (state, confirmation): SettlementsState => ({
    ...state,
    ui: {...state.ui, confirmation},
  })),

  on(SettlementsActions.closeConfirmation, (state): SettlementsState => ({
    ...state,
    ui: closeConfirmationUi(state),
  })),

  on(SettlementsActions.deleteGroupSuccess, (state, {groupId}): SettlementsState => ({
    ...state,
    groups: removeGroup(state.groups, groupId),
    saving: false,
    ui: closeConfirmationUi(state),
  })),

  on(SettlementsActions.deleteGroupFailure, (state, {error}): SettlementsState => ({
    ...state,
    saving: false,
    error,
  })),

  on(SettlementsActions.showAddEntryForm, (state, {groupId}): SettlementsState => ({
    ...state,
    ui: {
      ...state.ui,
      addingEntryGroupId: groupId,
      showNewGroupForm: false,
    },
  })),

  on(SettlementsActions.hideAddEntryForm, (state): SettlementsState => ({
    ...state,
    ui: {...state.ui, addingEntryGroupId: null},
  })),

  on(
    SettlementsActions.createEntrySuccess,
    SettlementsActions.deleteEntrySuccess,
    SettlementsActions.payInstallmentSuccess,
    SettlementsActions.archiveEntrySuccess,
    (state, {group}): SettlementsState => ({
      ...state,
      groups: replaceGroup(state.groups, group),
      saving: false,
      ui: {
        ...closeConfirmationUi(state),
        addingEntryGroupId: null,
      },
    })
  ),

  on(
    SettlementsActions.createEntryFailure,
    SettlementsActions.deleteEntryFailure,
    SettlementsActions.payInstallmentFailure,
    SettlementsActions.archiveEntryFailure,
    (state, {error}): SettlementsState => ({
      ...state,
      saving: false,
      error,
    })
  ),

  on(SettlementsActions.toggleEntryExpanded, (state, {entryId}): SettlementsState => {
    const expanded: readonly string[] = state.ui.expandedEntryIds;
    const isExpanded: boolean = expanded.includes(entryId);
    return {
      ...state,
      ui: {
        ...state.ui,
        expandedEntryIds: isExpanded
          ? expanded.filter((id) => id !== entryId)
          : [...expanded, entryId],
      },
    };
  })
);
