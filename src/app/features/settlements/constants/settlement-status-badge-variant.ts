import {SettlementStatus} from '@core/models/settlement-status.enum';

export const SETTLEMENT_STATUS_BADGE_VARIANT: Record<
  SettlementStatus,
  'success' | 'danger' | 'neutral' | 'warning'
> = {
  [SettlementStatus.OPEN]: 'neutral',
  [SettlementStatus.OVERDUE]: 'danger',
  [SettlementStatus.SETTLED]: 'success',
  [SettlementStatus.ARCHIVED]: 'neutral',
};
