import {EntryDirection} from './entry-direction.enum';
import {CreateInstallmentPayload} from './create-installment-payload.interface';

export interface CreateEntryPayload {
  readonly groupId: string;
  readonly direction: EntryDirection;
  readonly personName: string;
  readonly totalAmount: number;
  readonly description: string;
  readonly dueDate: string;
  readonly splitIntoInstallments: boolean;
  readonly installments: readonly CreateInstallmentPayload[];
}
