import {Settlement} from './settlement.interface';

export interface SettlementGroup {
  readonly id: string;
  readonly name: string;
  readonly entries: Settlement[];
}
