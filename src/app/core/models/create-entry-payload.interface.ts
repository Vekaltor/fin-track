import {EntryDirection} from './entry-direction.enum';
import {CreateInstallmentPayload} from './create-installment-payload.interface';
import {InstallmentIntervalUnit} from './installment-interval-unit.enum';

export interface CreateEntryPayload {
  readonly groupId: string;
  readonly direction: EntryDirection;
  readonly personName: string;
  readonly totalAmount: number;
  readonly description: string;
  readonly dueDate: string;
  readonly splitIntoInstallments: boolean;
  readonly installments: readonly CreateInstallmentPayload[];
  readonly installmentIntervalAmount?: number;
  readonly installmentIntervalUnit?: InstallmentIntervalUnit;
}
