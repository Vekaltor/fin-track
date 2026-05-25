import {Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {ModalService} from '@shared/services/modal.service';

@Component({
  selector: 'app-confirmation-delete-group',
  imports: [NgIcon, AppButton],
  templateUrl: './confirmation-delete-group.html',
})
export class ConfirmationDeleteGroup {
  private readonly modal: ModalService = inject(ModalService);

  public readonly loading: InputSignal<boolean> = input(false);

  public readonly confirmed: OutputEmitterRef<void> = output();

  protected onCancel(): void {
    this.modal.close();
  }
}
