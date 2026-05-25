import {SettlementStatus} from '@core/models/settlement-status.enum';
import {SettlementType} from '@core/models/settlement-type.enum';
import {GroupTotals} from '@features/settlements/models/group-totals.interface';
import {InstallmentStatus} from '@core/models/installment-status.enum';
import {Settlement} from '@core/models/settlement.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SettlementsSummary} from '@features/settlements/models/settlements-summary.interface';

export function getEntryProgressPercent(entry: Settlement): number {
  if (entry.installments.length === 0) {
    return 0;
  }
  const paidCount: number = entry.installments.filter(
    (i) => i.status === InstallmentStatus.PAID
  ).length;
  return Math.round((paidCount / entry.installments.length) * 100);
}

export function calculateGroupTotals(entries: Settlement[]): GroupTotals {
  let receivable = 0;
  let debt = 0;
  for (const entry of entries) {
    const remaining: number = getEntryRemainingAmount(entry);
    if (entry.type === SettlementType.RECEIVABLE) {
      receivable += remaining;
    } else {
      debt += remaining;
    }
  }
  return {receivable, debt};
}

export function calculateSummary(groups: SettlementGroup[]): SettlementsSummary {
  let totalToReceive = 0;
  let totalToPay = 0;
  for (const group of groups) {
    for (const entry of group.entries) {
      if (entry.status === SettlementStatus.SETTLED || entry.status === SettlementStatus.ARCHIVED) {
        continue;
      }
      const remaining: number = getEntryRemainingAmount(entry);
      if (entry.type === SettlementType.RECEIVABLE) {
        totalToReceive += remaining;
      } else {
        totalToPay += remaining;
      }
    }
  }
  return {
    totalToReceive,
    totalToPay,
    balance: totalToReceive - totalToPay,
  };
}

function getEntryRemainingAmount(entry: Settlement): number {
  const paid: number = entry.installments
    .filter((i) => i.status === InstallmentStatus.PAID)
    .reduce((sum, i) => sum + i.amount, 0);
  return entry.totalAmount - paid;
}
