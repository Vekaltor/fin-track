import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {SettlementConfirmationAction} from '@core/models/settlement-confirmation-action.enum';
import {provideIcons} from '@ng-icons/core';
import {
  heroArchiveBox,
  heroExclamationTriangle,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import {AppConfirmDialog} from '@shared/components/ui/app-confirm-dialog/app-confirm-dialog';
import {ConfirmationDialogViewModel} from '../../store/settlements.selectors';
import {SettlementsFacade} from '../../store/settlements.facade';

@Component({
  selector: 'app-settlements-confirm-dialog',
  imports: [AsyncPipe, AppConfirmDialog],
  providers: [provideIcons({heroExclamationTriangle, heroTrash, heroArchiveBox})],
  templateUrl: './settlements-confirm-dialog.html',
})
export class SettlementsConfirmDialog {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);

  protected onCancel(): void {
    this.facade.closeConfirmation();
  }

  protected onConfirm(dialog: ConfirmationDialogViewModel): void {
    this.facade.confirmDialogAction(dialog.groupId, dialog.entryId, dialog.action);
  }
}
