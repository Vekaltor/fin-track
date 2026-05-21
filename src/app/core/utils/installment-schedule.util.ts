import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';
import {InstallmentStatus} from '@core/models/installment-status.enum';
import {Installment} from '@core/models/installment.interface';
import {SettlementEntry} from '@core/models/settlement-entry.interface';
import {addIntervalToDate, daysBetween} from './installment-date.util';

export interface InstallmentSchedule {
  readonly intervalAmount: number;
  readonly intervalUnit: InstallmentIntervalUnit;
}

export function getPlannedDueDate(installment: Installment): string {
  return installment.plannedDueDate ?? installment.dueDate;
}

export function isInstallmentRescheduled(installment: Installment): boolean {
  return (
    installment.status === InstallmentStatus.UNPAID &&
    getPlannedDueDate(installment) !== installment.dueDate
  );
}

export function resolveInstallmentSchedule(entry: SettlementEntry): InstallmentSchedule | null {
  if (
    entry.installmentIntervalAmount !== undefined &&
    entry.installmentIntervalUnit !== undefined
  ) {
    return {
      intervalAmount: entry.installmentIntervalAmount,
      intervalUnit: entry.installmentIntervalUnit,
    };
  }

  const sorted: Installment[] = [...entry.installments].sort((a, b) => a.index - b.index);
  if (sorted.length < 2) {
    return null;
  }

  const first: Installment = sorted[0]!;
  const second: Installment = sorted[1]!;
  const stepDays: number = daysBetween(getPlannedDueDate(first), getPlannedDueDate(second));
  if (stepDays <= 0) {
    return null;
  }

  if (stepDays % 7 === 0 && stepDays <= 21) {
    return {intervalAmount: stepDays / 7, intervalUnit: InstallmentIntervalUnit.WEEKS};
  }
  if (stepDays >= 28 && stepDays <= 31) {
    return {intervalAmount: 1, intervalUnit: InstallmentIntervalUnit.MONTHS};
  }
  if (stepDays >= 365 && stepDays <= 366) {
    return {intervalAmount: 1, intervalUnit: InstallmentIntervalUnit.YEARS};
  }

  return {intervalAmount: stepDays, intervalUnit: InstallmentIntervalUnit.DAYS};
}

export function markInstallmentsPaidAndReschedule(
  installments: readonly Installment[],
  paidIds: readonly string[],
  paidAt: string,
  schedule: InstallmentSchedule | null
): Installment[] {
  if (paidIds.length === 0) {
    return [...installments];
  }

  const paidIdSet: Set<string> = new Set(paidIds);
  const marked: Installment[] = installments.map((inst) =>
    paidIdSet.has(inst.id)
      ? {
          ...inst,
          status: InstallmentStatus.PAID,
          paidAt,
          paymentMethod: inst.paymentMethod ?? 'Przelew',
        }
      : inst
  );

  if (!schedule) {
    return marked;
  }

  const paidInstallments: Installment[] = marked
    .filter((inst) => inst.status === InstallmentStatus.PAID)
    .sort((a, b) => a.index - b.index);
  const lastPaid: Installment | undefined = paidInstallments.at(-1);
  if (!lastPaid) {
    return marked;
  }

  const anchorDate: string = paidAt;
  const lastPaidIndex: number = lastPaid.index;

  return marked.map((inst) => {
    if (inst.status !== InstallmentStatus.UNPAID) {
      return inst;
    }

    const stepsFromAnchor: number = inst.index - lastPaidIndex;
    const dueDate: string = addIntervalToDate(
      anchorDate,
      stepsFromAnchor,
      schedule.intervalAmount,
      schedule.intervalUnit
    );

    return {
      ...inst,
      dueDate,
      plannedDueDate: getPlannedDueDate(inst),
    };
  });
}
