import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {CreateSettlementEntryPayload} from '@core/models/create-settlement-entry-payload.interface';
import {CreateSettlementGroupPayload} from '@core/models/create-settlement-group-payload.interface';
import {SortField} from '@features/settlements/models/sort-field.enum';
import {StatusFilter} from '@features/settlements/models/status-filter.enum';
import {TypeFilter} from '@features/settlements/models/type-filter.enum';

export const SettlementsPageActions = createActionGroup({
  source: 'Settlements Page',
  events: {
    'Load Groups': emptyProps(),
    'Set Type Filter': props<{filter: TypeFilter}>(),
    'Set Status Filter': props<{filter: StatusFilter}>(),
    'Set Sort Field': props<{sort: SortField}>(),
    'Create Group': props<{payload: CreateSettlementGroupPayload}>(),
    'Delete Group': props<{groupId: string}>(),
    'Create Entry': props<{payload: CreateSettlementEntryPayload}>(),
    'Delete Entry': props<{groupId: string; entryId: string}>(),
    'Pay Installments': props<{groupId: string; entryId: string; installmentIds: string[]}>(),
    'Archive Entry': props<{groupId: string; entryId: string}>(),
  },
});
