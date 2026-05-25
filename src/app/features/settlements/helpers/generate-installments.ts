import {CreateInstallmentPayload} from '@core/models/create-installment-payload.interface';
import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';
import {addIntervalToDate} from '@features/settlements/helpers/add-interval-to-date';

export function isValidInstallmentInterval(
  amount: number,
  unit: InstallmentIntervalUnit
): boolean {
  return Number.isFinite(amount) && amount >= 1 && Object.values(InstallmentIntervalUnit).includes(unit);
}

function splitAmount(totalAmount: number, count: number): number[] {
  const cents: number = Math.round(totalAmount * 100);
  const baseCents: number = Math.floor(cents / count);
  const remainder: number = cents - baseCents * count;
  const amounts: number[] = Array.from({length: count}, () => baseCents / 100);

  if (remainder > 0) {
    amounts[count - 1] = (baseCents + remainder) / 100;
  }

  return amounts;
}

export function buildInstallmentPayloads(
  totalAmount: number,
  firstDueDate: string,
  count: number,
  intervalAmount: number,
  unit: InstallmentIntervalUnit
): CreateInstallmentPayload[] {
  if (!isValidInstallmentInterval(intervalAmount, unit)) {
    return [];
  }

  const amounts: number[] = splitAmount(totalAmount, count);

  return amounts.map((amount, index) => {
    const dueDate: string =
      index === 0
        ? firstDueDate
        : addIntervalToDate(firstDueDate, index, intervalAmount, unit);

    return {
      amount,
      dueDate,
      note: index === 0 ? 'Pierwsza rata' : undefined,
    };
  });
}
