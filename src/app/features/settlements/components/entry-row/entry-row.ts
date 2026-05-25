import {Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {EntryAmountBlock} from '../ui/entry-amount-block/entry-amount-block';
import {EntryInfo} from '../ui/entry-info/entry-info';
import {EntryRowActions} from '../ui/entry-row-actions/entry-row-actions';
import {EntryTypeIcon} from '../ui/entry-type-icon/entry-type-icon';
import {InstallmentPanel} from '../installment-panel/installment-panel';
import {Settlement} from '@core/models/settlement.interface';
import {ConfirmationDialogViewModel} from '@features/settlements/models/confirmation-dialog-view-model.interface';
import {SettlementConfirmationAction} from '@features/settlements/models/settlement-confirmation-action.enum';
import {SettlementsFacade} from '@features/settlements/store/settlements.facade';
import {ModalService} from '@shared/services/modal.service';

@Component({
  selector: 'app-entry-row',
  imports: [
    EntryTypeIcon,
    EntryInfo,
    EntryAmountBlock,
    EntryRowActions,
    InstallmentPanel,
  ],
  templateUrl: './entry-row.html',
})
export class EntryRow {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);
  private readonly modalService: ModalService = inject(ModalService);

  public readonly entry: InputSignal<Settlement> = input.required<Settlement>();
  public readonly groupId: InputSignal<string> = input.required();
  public readonly expanded: InputSignal<boolean> = input(false);
  public readonly saving: InputSignal<boolean> = input(false);

  public readonly toggleExpanded: OutputEmitterRef<void> = output();

  protected deleteEntry(): void {
    this.modalService.open<ConfirmationDialogViewModel>({
      action: SettlementConfirmationAction.DELETE_ENTRY,
      groupId: this.groupId(),
      entryId: this.entry().id,
      personName: this.entry().personName,
    });
  }

  protected archiveEntry(): void {
    this.modalService.open<ConfirmationDialogViewModel>({
      action: SettlementConfirmationAction.ARCHIVE_ENTRY,
      groupId: this.groupId(),
      entryId: this.entry().id,
      personName: this.entry().personName,
    });
  }

  protected payInstallments(installmentIds: string[]): void {
    this.facade.payInstallments(this.groupId(), this.entry().id, installmentIds);
  }
}
