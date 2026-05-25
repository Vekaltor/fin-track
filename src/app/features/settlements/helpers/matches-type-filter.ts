import {Settlement} from '@core/models/settlement.interface';
import {TypeFilter} from '@features/settlements/models/type-filter.enum';
import {SettlementType} from '@core/models/settlement-type.enum';

export function matchesTypeFilter(entry: Settlement, filter: TypeFilter): boolean {
  if (filter === TypeFilter.ALL) {
    return true;
  }
  if (filter === TypeFilter.DEBT) {
    return entry.type === SettlementType.DEBT;
  }
  return entry.type === SettlementType.RECEIVABLE;
}
