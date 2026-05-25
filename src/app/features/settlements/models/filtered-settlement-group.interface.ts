import {SettlementGroup} from '@core/models/settlement-group.interface';
import {Settlement} from '@core/models/settlement.interface';
import {calculateGroupTotals} from '@features/settlements/helpers/settlement-calculations';

export interface FilteredSettlementGroup extends Omit<SettlementGroup, 'entries'> {
  filteredSettlements: Settlement[];
  totals: ReturnType<typeof calculateGroupTotals>;
}
