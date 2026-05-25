import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';

export interface InstallmentSchedule {
  readonly intervalAmount: number;
  readonly intervalUnit: InstallmentIntervalUnit;
}
