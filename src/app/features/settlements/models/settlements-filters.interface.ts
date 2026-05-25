import {SortField} from '@features/settlements/models/sort-field.enum';
import {StatusFilter} from '@features/settlements/models/status-filter.enum';
import {TypeFilter} from '@features/settlements/models/type-filter.enum';

export interface SettlementsFilters {
  type: TypeFilter;
  status: StatusFilter;
  sort: SortField;
}
