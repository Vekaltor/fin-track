import {SettlementDirection} from './settlement-direction.enum';
import {CreateInstallmentPayload} from './create-installment-payload.interface';
import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';

export interface CreateSettlementEntryPayload {
  groupId: string;
  direction: SettlementDirection;
  personName: string;
  totalAmount: number;
  description: string;
  dueDate: string;
  splitIntoInstallments: boolean;
  installments: CreateInstallmentPayload[];
  installmentIntervalAmount?: number;
  installmentIntervalUnit?: InstallmentIntervalUnit;
}
