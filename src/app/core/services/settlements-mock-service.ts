import {Injectable} from '@angular/core';
import {delay, Observable, of, throwError} from 'rxjs';
import {directionToEntryType, INITIAL_SETTLEMENT_GROUPS} from '@core/data/settlements-mock-data';
import {CreateEntryPayload} from '@core/models/create-entry-payload.interface';
import {CreateGroupPayload} from '@core/models/create-group-payload.interface';
import {EntryStatus} from '@core/models/entry-status.enum';
import {GroupColor} from '@core/models/group-color.enum';
import {InstallmentStatus} from '@core/models/installment-status.enum';
import {Installment} from '@core/models/installment.interface';
import {SettlementEntry} from '@core/models/settlement-entry.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {
  markInstallmentsPaidAndReschedule,
  resolveInstallmentSchedule,
} from '@core/utils/installment-schedule.util';
import {SettlementsService} from './settlements-service';

@Injectable({providedIn: 'root'})
export class SettlementsMockService extends SettlementsService {
  private readonly delayMs: number = 400;
  private groups: SettlementGroup[] = structuredClone(INITIAL_SETTLEMENT_GROUPS);

  public override loadGroups(): Observable<readonly SettlementGroup[]> {
    return of(this.groups).pipe(delay(this.delayMs));
  }

  public override createGroup(payload: CreateGroupPayload): Observable<SettlementGroup> {
    const colors: GroupColor[] = [GroupColor.BLUE, GroupColor.GREEN, GroupColor.ORANGE];
    const group: SettlementGroup = {
      id: `group-${crypto.randomUUID()}`,
      name: payload.name.trim(),
      color: colors[this.groups.length % colors.length]!,
      entries: [],
    };
    this.groups = [...this.groups, group];
    return of(group).pipe(delay(this.delayMs));
  }

  public override deleteGroup(groupId: string): Observable<void> {
    const exists: boolean = this.groups.some((g) => g.id === groupId);
    if (!exists) {
      return throwError(() => new Error('Grupa nie istnieje'));
    }
    this.groups = this.groups.filter((g) => g.id !== groupId);
    return of(undefined).pipe(delay(this.delayMs));
  }

  public override createEntry(payload: CreateEntryPayload): Observable<SettlementGroup> {
    const groupIndex: number = this.groups.findIndex((g) => g.id === payload.groupId);
    if (groupIndex === -1) {
      return throwError(() => new Error('Grupa nie istnieje'));
    }

    const entryId: string = `entry-${crypto.randomUUID()}`;
    const installments: Installment[] = payload.splitIntoInstallments
      ? payload.installments.map((inst, index) => ({
          id: `${entryId}-inst-${index + 1}`,
          index: index + 1,
          amount: inst.amount,
          plannedDueDate: inst.dueDate,
          dueDate: inst.dueDate,
          note: inst.note,
          status: InstallmentStatus.UNPAID,
        }))
      : [
          {
            id: `${entryId}-inst-1`,
            index: 1,
            amount: payload.totalAmount,
            plannedDueDate: payload.dueDate,
            dueDate: payload.dueDate,
            status: InstallmentStatus.UNPAID,
          },
        ];

    const entry: SettlementEntry = {
      id: entryId,
      groupId: payload.groupId,
      personName: payload.personName.trim(),
      description: payload.description.trim(),
      date: payload.dueDate,
      totalAmount: payload.totalAmount,
      type: directionToEntryType(payload.direction),
      status: EntryStatus.OPEN,
      installments,
      installmentIntervalAmount: payload.installmentIntervalAmount,
      installmentIntervalUnit: payload.installmentIntervalUnit,
    };

    const group: SettlementGroup = this.groups[groupIndex]!;
    const updated: SettlementGroup = {
      ...group,
      entries: [...group.entries, entry],
    };
    this.groups = this.groups.map((g, i) => (i === groupIndex ? updated : g));
    return of(updated).pipe(delay(this.delayMs));
  }

  public override deleteEntry(groupId: string, entryId: string): Observable<SettlementGroup> {
    return this.updateGroupEntries(groupId, (entries) =>
      entries.filter((e) => e.id !== entryId)
    );
  }

  public override payInstallments(
    groupId: string,
    entryId: string,
    installmentIds: readonly string[]
  ): Observable<SettlementGroup> {
    const paidAt: string = new Date().toISOString().slice(0, 10);

    return this.updateGroupEntries(groupId, (entries) =>
      entries.map((entry) => {
        if (entry.id !== entryId) {
          return entry;
        }

        const schedule = resolveInstallmentSchedule(entry);
        const installments: Installment[] = markInstallmentsPaidAndReschedule(
          entry.installments,
          installmentIds,
          paidAt,
          schedule
        );
        const allPaid: boolean = installments.every(
          (i) => i.status === InstallmentStatus.PAID
        );

        return {
          ...entry,
          installments,
          status: allPaid ? EntryStatus.SETTLED : entry.status,
        };
      })
    );
  }

  public override archiveEntry(groupId: string, entryId: string): Observable<SettlementGroup> {
    return this.updateGroupEntries(groupId, (entries) =>
      entries.map((entry) =>
        entry.id === entryId ? {...entry, status: EntryStatus.ARCHIVED} : entry
      )
    );
  }

  private updateGroupEntries(
    groupId: string,
    updater: (entries: readonly SettlementEntry[]) => readonly SettlementEntry[]
  ): Observable<SettlementGroup> {
    const groupIndex: number = this.groups.findIndex((g) => g.id === groupId);
    if (groupIndex === -1) {
      return throwError(() => new Error('Grupa nie istnieje'));
    }
    const group: SettlementGroup = this.groups[groupIndex]!;
    const updated: SettlementGroup = {
      ...group,
      entries: updater(group.entries),
    };
    this.groups = this.groups.map((g, i) => (i === groupIndex ? updated : g));
    return of(updated).pipe(delay(this.delayMs));
  }
}
