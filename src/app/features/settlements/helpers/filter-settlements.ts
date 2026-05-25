import {Settlement} from '@core/models/settlement.interface';
import {SettlementsState} from '@features/settlements/models/settlements-state.interface';
import {matchesTypeFilter} from '@features/settlements/helpers/matches-type-filter';
import {matchesStatusFilter} from '@features/settlements/helpers/matches-status-filter';

export function filterSettlements(
  entries: readonly Settlement[],
  filters: SettlementsState['filters']
): Settlement[] {
  return entries.filter(
    (e) =>
      matchesTypeFilter(e, filters.type) && matchesStatusFilter(e, filters.status)
  );
}
