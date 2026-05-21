import {SettlementConfirmation} from '@core/models/settlement-confirmation.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SettlementsFilters} from '@core/models/settlements-filters.interface';
import {SortField} from '@core/models/sort-field.enum';
import {StatusFilter} from '@core/models/status-filter.enum';
import {TypeFilter} from '@core/models/type-filter.enum';

export const SETTLEMENTS_FEATURE_KEY = 'settlements';

export interface SettlementsUiState {
  readonly showNewGroupForm: boolean;
  readonly addingEntryGroupId: string | null;
  readonly expandedEntryIds: readonly string[];
  readonly confirmation: SettlementConfirmation | null;
}

export interface SettlementsState {
  readonly groups: readonly SettlementGroup[];
  readonly filters: SettlementsFilters;
  readonly ui: SettlementsUiState;
  readonly loading: boolean;
  readonly saving: boolean;
  readonly error: string | null;
}

export const initialSettlementsState: SettlementsState = {
  groups: [],
  filters: {
    type: TypeFilter.ALL,
    status: StatusFilter.ALL,
    sort: SortField.DATE,
  },
  ui: {
    showNewGroupForm: false,
    addingEntryGroupId: null,
    expandedEntryIds: [],
    confirmation: null,
  },
  loading: false,
  saving: false,
  error: null,
};
