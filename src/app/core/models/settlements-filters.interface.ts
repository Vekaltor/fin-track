import {SortField} from './sort-field.enum';
import {StatusFilter} from './status-filter.enum';
import {TypeFilter} from './type-filter.enum';

export interface SettlementsFilters {
  readonly type: TypeFilter;
  readonly status: StatusFilter;
  readonly sort: SortField;
}
