import {EntryStatus} from '@core/models/entry-status.enum';
import {EntryType} from '@core/models/entry-type.enum';
import {GroupTotals} from '@core/models/group-totals.interface';
import {InstallmentStatus} from '@core/models/installment-status.enum';
import {SettlementEntry} from '@core/models/settlement-entry.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {SettlementsSummary} from '@core/models/settlements-summary.interface';
import {StatusFilter} from '@core/models/status-filter.enum';
import {TypeFilter} from '@core/models/type-filter.enum';

export function getEntryProgressPercent(entry: SettlementEntry): number {
  if (entry.installments.length === 0) {
    return 0;
  }
  const paidCount: number = entry.installments.filter(
    (i) => i.status === InstallmentStatus.Paid
  ).length;
  return Math.round((paidCount / entry.installments.length) * 100);
}

export function getEntryRemainingAmount(entry: SettlementEntry): number {
  const paid: number = entry.installments
    .filter((i) => i.status === InstallmentStatus.Paid)
    .reduce((sum, i) => sum + i.amount, 0);
  return entry.totalAmount - paid;
}

export function matchesTypeFilter(entry: SettlementEntry, filter: TypeFilter): boolean {
  if (filter === TypeFilter.All) {
    return true;
  }
  if (filter === TypeFilter.Debt) {
    return entry.type === EntryType.Debt;
  }
  return entry.type === EntryType.Receivable;
}

export function matchesStatusFilter(entry: SettlementEntry, filter: StatusFilter): boolean {
  if (filter === StatusFilter.All) {
    return true;
  }
  const map: Record<StatusFilter, EntryStatus | null> = {
    [StatusFilter.All]: null,
    [StatusFilter.Open]: EntryStatus.Open,
    [StatusFilter.Overdue]: EntryStatus.Overdue,
    [StatusFilter.Settled]: EntryStatus.Settled,
    [StatusFilter.Archived]: EntryStatus.Archived,
  };
  const target: EntryStatus | null = map[filter];
  return target === null || entry.status === target;
}

export function calculateGroupTotals(entries: readonly SettlementEntry[]): GroupTotals {
  let receivable = 0;
  let debt = 0;
  for (const entry of entries) {
    const remaining: number = getEntryRemainingAmount(entry);
    if (entry.type === EntryType.Receivable) {
      receivable += remaining;
    } else {
      debt += remaining;
    }
  }
  return {receivable, debt};
}

export function calculateSummary(groups: readonly SettlementGroup[]): SettlementsSummary {
  let totalToReceive = 0;
  let totalToPay = 0;
  for (const group of groups) {
    for (const entry of group.entries) {
      if (entry.status === EntryStatus.Settled || entry.status === EntryStatus.Archived) {
        continue;
      }
      const remaining: number = getEntryRemainingAmount(entry);
      if (entry.type === EntryType.Receivable) {
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
