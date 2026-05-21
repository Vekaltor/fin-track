import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';

export function parseIsoDate(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00`);
}

export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function daysBetween(start: string, end: string): number {
  const diffMs: number = parseIsoDate(end).getTime() - parseIsoDate(start).getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function addIntervalToDate(
  isoDate: string,
  steps: number,
  intervalAmount: number,
  unit: InstallmentIntervalUnit
): string {
  const totalSteps: number = steps * intervalAmount;

  switch (unit) {
    case InstallmentIntervalUnit.DAYS: {
      const date: Date = parseIsoDate(isoDate);
      date.setDate(date.getDate() + totalSteps);
      return formatIsoDate(date);
    }
    case InstallmentIntervalUnit.WEEKS: {
      const date: Date = parseIsoDate(isoDate);
      date.setDate(date.getDate() + totalSteps * 7);
      return formatIsoDate(date);
    }
    case InstallmentIntervalUnit.MONTHS: {
      const date: Date = parseIsoDate(isoDate);
      date.setMonth(date.getMonth() + totalSteps);
      return formatIsoDate(date);
    }
    case InstallmentIntervalUnit.YEARS: {
      const date: Date = parseIsoDate(isoDate);
      date.setFullYear(date.getFullYear() + totalSteps);
      return formatIsoDate(date);
    }
  }
}
