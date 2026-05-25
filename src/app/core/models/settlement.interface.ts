import {SettlementStatus} from './settlement-status.enum';
import {SettlementType} from './settlement-type.enum';
import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';
import {Installment} from './installment.interface';

export interface Settlement {
  readonly id: string;
  readonly groupId: string;
  readonly personName: string;
  readonly description: string;
  readonly date: string;
  readonly totalAmount: number;
  readonly type: SettlementType;
  readonly status: SettlementStatus;
  readonly installments: readonly Installment[];
  readonly installmentIntervalAmount?: number;
  readonly installmentIntervalUnit?: InstallmentIntervalUnit;
}
