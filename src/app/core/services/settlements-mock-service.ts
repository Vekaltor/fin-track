import {inject, Injectable} from '@angular/core';
import {delay, Observable, of, throwError} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {directionToEntryType, INITIAL_SETTLEMENT_GROUPS} from '@core/data/settlements-mock-data';
import {CreateSettlementEntryPayload} from '@core/models/create-settlement-entry-payload.interface';
import {CreateSettlementGroupPayload} from '@core/models/create-settlement-group-payload.interface';
import {SettlementStatus} from '@core/models/settlement-status.enum';
import {InstallmentStatus} from '@core/models/installment-status.enum';
import {Installment} from '@core/models/installment.interface';
import {Settlement} from '@core/models/settlement.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {
  markInstallmentsPaidAndReschedule,
  resolveInstallmentSchedule,
} from '@features/settlements/helpers/installment-schedule';
import {SettlementsService} from './settlements-service';
import {SETTLEMENT_OPERATIONS} from '@core/constants/settlements-operations';
import {LoadingService} from '@core/services/loading-service';

@Injectable({providedIn: 'root'})
export class SettlementsMockService extends SettlementsService {
  private readonly loadingService: LoadingService = inject(LoadingService);

  private readonly delayMs: number = 400;

  private groups: SettlementGroup[] = structuredClone(INITIAL_SETTLEMENT_GROUPS);

  public override loadGroups(): Observable<SettlementGroup[]> {
    return this.withLoading(
      SETTLEMENT_OPERATIONS.LOAD_GROUPS,
      of(this.groups).pipe(delay(this.delayMs))
    );
  }

  public override createGroup(payload: CreateSettlementGroupPayload): Observable<SettlementGroup> {
    const group: SettlementGroup = {
      id: `group-${crypto.randomUUID()}`,
      name: payload.name.trim(),
      entries: [],
    };
    this.groups = [...this.groups, group];
    return this.withLoading(
      SETTLEMENT_OPERATIONS.CREATE_GROUP,
      of(group).pipe(delay(this.delayMs))
    );
  }

  public override deleteGroup(groupId: string): Observable<void> {
    const exists: boolean = this.groups.some((g) => g.id === groupId);
    if (!exists) {
      return throwError(() => new Error('Grupa nie istnieje'));
    }
    this.groups = this.groups.filter((g) => g.id !== groupId);
    return this.withLoading(
      SETTLEMENT_OPERATIONS.DELETE_GROUP,
      of(undefined).pipe(delay(this.delayMs))
    );
  }

  public override createEntry(payload: CreateSettlementEntryPayload): Observable<SettlementGroup> {
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

    const entry: Settlement = {
      id: entryId,
      groupId: payload.groupId,
      personName: payload.personName.trim(),
      description: payload.description.trim(),
      date: payload.dueDate,
      totalAmount: payload.totalAmount,
      type: directionToEntryType(payload.direction),
      status: SettlementStatus.OPEN,
      installments,
      installmentIntervalAmount: payload.installmentIntervalAmount,
      installmentIntervalUnit: payload.installmentIntervalUnit,
    };

    const group: SettlementGroup = this.groups[groupIndex]!;
    const updated: SettlementGroup = {...group, entries: [...group.entries, entry]};
    this.groups = this.groups.map((g, i) => (i === groupIndex ? updated : g));

    return this.withLoading(
      SETTLEMENT_OPERATIONS.CREATE_ENTRY,
      of(updated).pipe(delay(this.delayMs))
    );
  }

  public override deleteEntry(groupId: string, entryId: string): Observable<SettlementGroup> {
    return this.withLoading(
      SETTLEMENT_OPERATIONS.DELETE_ENTRY,
      this.updateGroupEntries(groupId, (entries) => entries.filter((e) => e.id !== entryId))
    );
  }

  public override payInstallments(
    groupId: string,
    entryId: string,
    installmentIds: readonly string[]
  ): Observable<SettlementGroup> {
    const paidAt: string = new Date().toISOString().slice(0, 10);

    return this.withLoading(
      SETTLEMENT_OPERATIONS.PAY_INSTALLMENTS,
      this.updateGroupEntries(groupId, (entries) =>
        entries.map((entry) => {
          if (entry.id !== entryId) return entry;

          const schedule = resolveInstallmentSchedule(entry);
          const installments: Installment[] = markInstallmentsPaidAndReschedule(
            entry.installments,
            installmentIds,
            paidAt,
            schedule
          );
          const allPaid = installments.every((i) => i.status === InstallmentStatus.PAID);

          return {
            ...entry,
            installments,
            status: allPaid ? SettlementStatus.SETTLED : entry.status,
          };
        })
      )
    );
  }

  public override archiveEntry(groupId: string, entryId: string): Observable<SettlementGroup> {
    return this.withLoading(
      SETTLEMENT_OPERATIONS.ARCHIVE_ENTRY,
      this.updateGroupEntries(groupId, (entries) =>
        entries.map((entry) =>
          entry.id === entryId ? {...entry, status: SettlementStatus.ARCHIVED} : entry
        )
      )
    );
  }

  private withLoading<T>(operationId: string, source$: Observable<T>): Observable<T> {
    this.loadingService.start(operationId);
    return source$.pipe(finalize(() => this.loadingService.stop(operationId)));
  }

  private updateGroupEntries(
    groupId: string,
    updater: (entries: Settlement[]) => Settlement[]
  ): Observable<SettlementGroup> {
    const groupIndex: number = this.groups.findIndex((g) => g.id === groupId);
    if (groupIndex === -1) {
      return throwError(() => new Error('Grupa nie istnieje'));
    }
    const group: SettlementGroup = this.groups[groupIndex]!;
    const updated: SettlementGroup = {...group, entries: updater(group.entries)};
    this.groups = this.groups.map((g, i) => (i === groupIndex ? updated : g));
    return of(updated).pipe(delay(this.delayMs));
  }
}
