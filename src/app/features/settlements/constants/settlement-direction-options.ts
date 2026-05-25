import {SettlementDirection} from '@core/models/settlement-direction.enum';
import {SelectOption} from '@shared/models/types/select-option.type';

export const SETTLEMENT_DIRECTION_OPTIONS: SelectOption<SettlementDirection>[] = [
  {value: SettlementDirection.TO_RECEIVE, label: 'Ktoś mi winien'},
  {value: SettlementDirection.TO_PAY, label: 'Ja komuś winien'},
];
