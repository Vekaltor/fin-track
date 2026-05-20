import {AsyncPipe} from '@angular/common';
import {Component, inject, input, InputSignal} from '@angular/core';
import {CreateEntryPayload} from '@core/models/create-entry-payload.interface';
import {FilteredSettlementGroup} from '../../store/settlements.selectors';
import {SettlementsFacade} from '../../store/settlements.facade';
import {EntryForm} from '../entry-form/entry-form';
import {EntryRow} from '../entry-row/entry-row';
import {GroupHeader} from '../group-header/group-header';

@Component({
  selector: 'app-group-panel',
  imports: [AsyncPipe, GroupHeader, EntryForm, EntryRow],
  templateUrl: './group-panel.html',
})
export class GroupPanel {
  public readonly group: InputSignal<FilteredSettlementGroup> =
    input.required<FilteredSettlementGroup>();

  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);

  protected isAddingEntry(groupId: string, addingId: string | null): boolean {
    return addingId === groupId;
  }

  protected isExpanded(entryId: string, expandedIds: readonly string[]): boolean {
    return expandedIds.includes(entryId);
  }

  protected onAddEntry(): void {
    this.facade.showAddEntryForm(this.group().id);
  }

  protected onDeleteGroup(): void {
    this.facade.openDeleteGroupConfirmation(this.group().id, this.group().name);
  }

  protected onEntrySaved(payload: CreateEntryPayload): void {
    this.facade.createEntry(payload);
  }

  protected onEntryFormCancel(): void {
    this.facade.hideAddEntryForm();
  }

  protected onToggleExpanded(entryId: string): void {
    this.facade.toggleEntryExpanded(entryId);
  }

  protected onDeleteEntry(entryId: string): void {
    const entry = this.group().entries.find((e) => e.id === entryId);
    if (!entry) {
      return;
    }
    this.facade.openDeleteEntryConfirmation(this.group().id, entryId, entry.personName);
  }

  protected onArchiveEntry(entryId: string): void {
    const entry = this.group().entries.find((e) => e.id === entryId);
    if (!entry) {
      return;
    }
    this.facade.openArchiveEntryConfirmation(this.group().id, entryId, entry.personName);
  }

  protected onPayInstallment(event: {
    entryId: string;
    installmentId: string;
  }): void {
    this.facade.payInstallment(this.group().id, event.entryId, event.installmentId);
  }
}
