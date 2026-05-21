import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SettlementConfirmationAction} from '@core/models/settlement-confirmation-action.enum';
import {provideIcons} from '@ng-icons/core';
import {
  heroArchiveBox,
  heroExclamationTriangle,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import {AppModal} from '@shared/components/ui/app-modal/app-modal';
import {ModalService} from '@shared/services/modal.service';
import {ConfirmationDialogViewModel} from '../../store/settlements.selectors';
import {SettlementsFacade} from '../../store/settlements.facade';
import {ConfirmationArchiveEntry} from '../confirmations/confirmation-archive-entry/confirmation-archive-entry';
import {ConfirmationDeleteEntry} from '../confirmations/confirmation-delete-entry/confirmation-delete-entry';
import {ConfirmationDeleteGroup} from '../confirmations/confirmation-delete-group/confirmation-delete-group';

@Component({
  selector: 'app-settlements-confirm-dialog',
  imports: [
    AsyncPipe,
    AppModal,
    ConfirmationDeleteGroup,
    ConfirmationDeleteEntry,
    ConfirmationArchiveEntry,
  ],
  templateUrl: './settlements-confirm-dialog.html',
})
export class SettlementsConfirmDialog {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);
  private readonly modal: ModalService = inject(ModalService);

  protected readonly SettlementConfirmationAction = SettlementConfirmationAction;

  constructor() {
    this.facade.confirmationDialog$
      .pipe(takeUntilDestroyed())
      .subscribe((dialog: ConfirmationDialogViewModel | null) => {
        if (dialog) {
          this.modal.open({onClose: () => this.facade.closeConfirmation()});
        } else {
          this.modal.closeSilently();
        }
      });
  }

  protected onConfirm(dialog: ConfirmationDialogViewModel): void {
    this.facade.confirmDialogAction(dialog.groupId, dialog.entryId, dialog.action);
  }
}
