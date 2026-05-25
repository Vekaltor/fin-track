import {SortField} from '@features/settlements/models/sort-field.enum';
import {StatusFilter} from '@features/settlements/models/status-filter.enum';
import {TypeFilter} from '@features/settlements/models/type-filter.enum';
import {SettlementsState} from '@features/settlements/models/settlements-state.interface';

export const SETTLEMENTS_FEATURE_KEY = 'settlements';

export const initialSettlementsState: SettlementsState = {
  groups: [],
  filters: {
    type: TypeFilter.ALL,
    status: StatusFilter.ALL,
    sort: SortField.DATE,
  },
  error: null,
};
