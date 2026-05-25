import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';
import {DateUtil} from '@utils/date-util';

export function addIntervalToDate(
  isoDate: string,
  steps: number,
  intervalAmount: number,
  unit: InstallmentIntervalUnit
): string {
  const totalSteps: number = steps * intervalAmount;

  switch (unit) {
    case InstallmentIntervalUnit.DAYS: {
      const date: Date = DateUtil.parseIso(isoDate);
      date.setDate(date.getDate() + totalSteps);
      return DateUtil.formatIso(date);
    }
    case InstallmentIntervalUnit.WEEKS: {
      const date: Date = DateUtil.parseIso(isoDate);
      date.setDate(date.getDate() + totalSteps * 7);
      return DateUtil.formatIso(date);
    }
    case InstallmentIntervalUnit.MONTHS: {
      const date: Date = DateUtil.parseIso(isoDate);
      date.setMonth(date.getMonth() + totalSteps);
      return DateUtil.formatIso(date);
    }
    case InstallmentIntervalUnit.YEARS: {
      const date: Date = DateUtil.parseIso(isoDate);
      date.setFullYear(date.getFullYear() + totalSteps);
      return DateUtil.formatIso(date);
    }
  }
}
