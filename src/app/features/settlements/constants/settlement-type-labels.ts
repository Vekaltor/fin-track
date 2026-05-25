import {SettlementType} from '@core/models/settlement-type.enum';

export const SETTLEMENT_TYPE_LABELS: Record<SettlementType, string> = {
  [SettlementType.DEBT]: 'dług',
  [SettlementType.RECEIVABLE]: 'należność',
};
