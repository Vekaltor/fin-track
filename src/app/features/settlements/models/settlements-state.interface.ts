import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SettlementsFilters} from '@features/settlements/models/settlements-filters.interface';

export interface SettlementsState {
  groups: SettlementGroup[];
  filters: SettlementsFilters;
  error: string | null;
}
