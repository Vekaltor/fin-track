import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';
import {SelectOption} from '@shared/models/types/select-option.type';

export const INSTALLMENT_INTERVAL_UNIT_OPTIONS: SelectOption<InstallmentIntervalUnit>[] = [
  {value: InstallmentIntervalUnit.DAYS, label: 'Dni'},
  {value: InstallmentIntervalUnit.WEEKS, label: 'Tygodnie'},
  {value: InstallmentIntervalUnit.MONTHS, label: 'Miesiące'},
  {value: InstallmentIntervalUnit.YEARS, label: 'Lata'},
];
