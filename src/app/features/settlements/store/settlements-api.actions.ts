import {createActionGroup, props} from '@ngrx/store';
import {SettlementGroup} from '@core/models/settlement-group.interface';

export const SettlementsApiActions = createActionGroup({
  source: 'Settlements API',
  events: {
    'Load Groups Success': props<{groups: SettlementGroup[]}>(),
    'Load Groups Failure': props<{error: string}>(),
    'Create Group Success': props<{group: SettlementGroup}>(),
    'Create Group Failure': props<{error: string}>(),
    'Delete Group Success': props<{groupId: string}>(),
    'Delete Group Failure': props<{error: string}>(),
    'Create Entry Success': props<{group: SettlementGroup}>(),
    'Create Entry Failure': props<{error: string}>(),
    'Delete Entry Success': props<{group: SettlementGroup}>(),
    'Delete Entry Failure': props<{error: string}>(),
    'Pay Installments Success': props<{group: SettlementGroup}>(),
    'Pay Installments Failure': props<{error: string}>(),
    'Archive Entry Success': props<{group: SettlementGroup}>(),
    'Archive Entry Failure': props<{error: string}>(),
  },
});
