import {Component, inject, input, InputSignal, signal, Signal, WritableSignal} from '@angular/core';
import {CreateSettlementEntryPayload} from '@core/models/create-settlement-entry-payload.interface';
import {SettlementsFacade} from '../../store/settlements.facade';
import {EntryForm} from '../entry-form/entry-form';
import {EntryRow} from '../entry-row/entry-row';
import {GroupHeader} from '../group-header/group-header';
import {FilteredSettlementGroup} from '@features/settlements/models/filtered-settlement-group.interface';
import {SettlementConfirmationAction} from '@features/settlements/models/settlement-confirmation-action.enum';
import {ModalService} from '@shared/services/modal.service';
import {ConfirmationDialogViewModel} from '@features/settlements/models/confirmation-dialog-view-model.interface';

@Component({
  selector: 'app-group-panel',
  imports: [GroupHeader, EntryForm, EntryRow],
  templateUrl: './group-panel.html',
})
export class GroupPanel {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);
  private readonly modalService: ModalService = inject(ModalService);

  protected readonly isSaving: Signal<boolean> = this.facade.isSaving;
  protected readonly showSettlementForm: WritableSignal<boolean> = signal(false);
  protected readonly expandedEntryIds: WritableSignal<Set<string>> = signal(new Set());

  public readonly group: InputSignal<FilteredSettlementGroup> = input.required();

  protected onShowEntryForm(): void {
    this.showSettlementForm.set(true);
  }

  protected onHideEntryForm(): void {
    this.showSettlementForm.set(false);
  }

  protected isExpanded(entryId: string): boolean {
    return this.expandedEntryIds().has(entryId);
  }

  protected onToggleExpanded(entryId: string): void {
    this.expandedEntryIds.update((ids) => {
      const next = new Set(ids);
      next.has(entryId) ? next.delete(entryId) : next.add(entryId);
      return next;
    });
  }

  protected onDeleteGroup(): void {
    this.modalService.open<ConfirmationDialogViewModel>({
      action: SettlementConfirmationAction.DELETE_GROUP,
      groupId: this.group().id,
      personName: this.group().name,
    });
  }

  protected onEntrySaved(payload: CreateSettlementEntryPayload): void {
    this.facade.createSettlement(payload);
    this.showSettlementForm.set(false);
  }
}
