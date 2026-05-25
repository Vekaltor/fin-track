import {Component, computed, inject, Signal} from '@angular/core';
import {SettlementConfirmationAction} from '@features/settlements/models/settlement-confirmation-action.enum';
import {AppModal} from '@shared/components/ui/app-modal/app-modal';
import {ModalService} from '@shared/services/modal.service';
import {SettlementsFacade} from '../../store/settlements.facade';
import {ConfirmationArchiveEntry} from '../confirmations/confirmation-archive-entry/confirmation-archive-entry';
import {ConfirmationDeleteEntry} from '../confirmations/confirmation-delete-entry/confirmation-delete-entry';
import {ConfirmationDeleteGroup} from '../confirmations/confirmation-delete-group/confirmation-delete-group';
import {ConfirmationDialogViewModel} from '@features/settlements/models/confirmation-dialog-view-model.interface';

@Component({
  selector: 'app-settlements-confirm-dialog',
  imports: [AppModal, ConfirmationDeleteGroup, ConfirmationDeleteEntry, ConfirmationArchiveEntry],
  templateUrl: './settlements-confirm-dialog.html',
})
export class SettlementsConfirmDialog {
  private readonly facade: SettlementsFacade = inject(SettlementsFacade);
  private readonly modalService: ModalService = inject(ModalService);

  protected readonly SettlementConfirmationAction = SettlementConfirmationAction;
  protected readonly config = computed(() => this.modalService.getData<ConfirmationDialogViewModel>());
  protected readonly isSaving: Signal<boolean> = this.facade.isSaving;

  protected onConfirm(): void {
    const config: ConfirmationDialogViewModel | null = this.config();
    if (!config) return;

    switch (config.action) {
      case SettlementConfirmationAction.DELETE_GROUP:
        this.facade.deleteGroup(config.groupId);
        break;
      case SettlementConfirmationAction.DELETE_ENTRY:
        if (config.entryId) this.facade.deleteSettlement(config.groupId, config.entryId);
        break;
      case SettlementConfirmationAction.ARCHIVE_ENTRY:
        if (config.entryId) this.facade.archiveSettlement(config.groupId, config.entryId);
        break;
    }

    this.modalService.close();
  }
}
