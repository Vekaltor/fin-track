import {GroupColor} from './group-color.enum';
import {SettlementEntry} from './settlement-entry.interface';

export interface SettlementGroup {
  readonly id: string;
  readonly name: string;
  readonly color: GroupColor;
  readonly entries: readonly SettlementEntry[];
}
