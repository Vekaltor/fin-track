import {SettlementStatus} from '@core/models/settlement-status.enum';

export const SETTLEMENT_STATUS_LABELS: Record<SettlementStatus, string> = {
  [SettlementStatus.OPEN]: 'Otwarte',
  [SettlementStatus.OVERDUE]: 'Po terminie',
  [SettlementStatus.SETTLED]: 'Rozliczone',
  [SettlementStatus.ARCHIVED]: 'Archiwum',
};
