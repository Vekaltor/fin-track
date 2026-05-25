import {Settlement} from '@core/models/settlement.interface';
import {StatusFilter} from '@features/settlements/models/status-filter.enum';
import {SettlementStatus} from '@core/models/settlement-status.enum';

export function matchesStatusFilter(entry: Settlement, filter: StatusFilter): boolean {
  if (filter === StatusFilter.ALL) {
    return true;
  }
  const map: Record<StatusFilter, SettlementStatus | null> = {
    [StatusFilter.ALL]: null,
    [StatusFilter.OPEN]: SettlementStatus.OPEN,
    [StatusFilter.OVERDUE]: SettlementStatus.OVERDUE,
    [StatusFilter.SETTLED]: SettlementStatus.SETTLED,
    [StatusFilter.ARCHIVED]: SettlementStatus.ARCHIVED,
  };
  const target: SettlementStatus | null = map[filter];
  return target === null || entry.status === target;
}
