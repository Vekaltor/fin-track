import {EntryStatus} from './entry-status.enum';
import {EntryType} from './entry-type.enum';
import {Installment} from './installment.interface';

export interface SettlementEntry {
  readonly id: string;
  readonly groupId: string;
  readonly personName: string;
  readonly description: string;
  readonly date: string;
  readonly totalAmount: number;
  readonly type: EntryType;
  readonly status: EntryStatus;
  readonly installments: readonly Installment[];
}
