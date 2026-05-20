import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {CreateEntryPayload} from '@core/models/create-entry-payload.interface';
import {CreateGroupPayload} from '@core/models/create-group-payload.interface';
import {SettlementConfirmationAction} from '@core/models/settlement-confirmation-action.enum';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SortField} from '@core/models/sort-field.enum';
import {StatusFilter} from '@core/models/status-filter.enum';
import {TypeFilter} from '@core/models/type-filter.enum';

export const SettlementsActions = createActionGroup({
  source: 'Settlements',
  events: {
    'Load Groups': emptyProps(),
    'Load Groups Success': props<{groups: readonly SettlementGroup[]}>(),
    'Load Groups Failure': props<{error: string}>(),

    'Set Type Filter': props<{filter: TypeFilter}>(),
    'Set Status Filter': props<{filter: StatusFilter}>(),
    'Set Sort Field': props<{sort: SortField}>(),

    'Show New Group Form': emptyProps(),
    'Hide New Group Form': emptyProps(),
    'Create Group': props<{payload: CreateGroupPayload}>(),
    'Create Group Success': props<{group: SettlementGroup}>(),
    'Create Group Failure': props<{error: string}>(),

    'Open Confirmation': props<{
      action: SettlementConfirmationAction;
      groupId: string;
      entryId?: string;
      personName?: string;
      groupName?: string;
    }>(),
    'Close Confirmation': emptyProps(),
    'Delete Group': props<{groupId: string}>(),
    'Delete Group Success': props<{groupId: string}>(),
    'Delete Group Failure': props<{error: string}>(),

    'Show Add Entry Form': props<{groupId: string}>(),
    'Hide Add Entry Form': emptyProps(),
    'Create Entry': props<{payload: CreateEntryPayload}>(),
    'Create Entry Success': props<{group: SettlementGroup}>(),
    'Create Entry Failure': props<{error: string}>(),

    'Delete Entry': props<{groupId: string; entryId: string}>(),
    'Delete Entry Success': props<{group: SettlementGroup}>(),
    'Delete Entry Failure': props<{error: string}>(),

    'Toggle Entry Expanded': props<{entryId: string}>(),
    'Pay Installment': props<{
      groupId: string;
      entryId: string;
      installmentId: string;
    }>(),
    'Pay Installment Success': props<{group: SettlementGroup}>(),
    'Pay Installment Failure': props<{error: string}>(),

    'Archive Entry': props<{groupId: string; entryId: string}>(),
    'Archive Entry Success': props<{group: SettlementGroup}>(),
    'Archive Entry Failure': props<{error: string}>(),
  },
});
