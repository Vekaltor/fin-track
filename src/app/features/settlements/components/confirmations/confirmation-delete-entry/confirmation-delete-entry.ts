import {Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {ModalService} from '@shared/services/modal.service';

@Component({
  selector: 'app-confirmation-delete-entry',
  imports: [NgIcon, AppButton],
  templateUrl: './confirmation-delete-entry.html',
})
export class ConfirmationDeleteEntry {
  private readonly modal: ModalService = inject(ModalService);

  public readonly personName: InputSignal<string> = input<string>('');
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly confirmed: OutputEmitterRef<void> = output<void>();

  protected onCancel(): void {
    this.modal.close();
  }
}
