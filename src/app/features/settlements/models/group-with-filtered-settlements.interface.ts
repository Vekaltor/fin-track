import {SettlementGroup} from '@core/models/settlement-group.interface';
import {Settlement} from '@core/models/settlement.interface';

export interface GroupWithFilteredSettlements extends Omit<SettlementGroup, 'entries'> {
  filteredSettlements: Settlement[];
}
