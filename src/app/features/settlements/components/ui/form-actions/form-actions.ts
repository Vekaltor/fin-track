import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';

@Component({
  selector: 'app-form-actions',
  imports: [AppButton],
  templateUrl: './form-actions.html',
})
export class FormActions {
  public readonly loading: InputSignal<boolean> = input<boolean>(false);

  public readonly cancelled: OutputEmitterRef<void> = output<void>();
  public readonly submitted: OutputEmitterRef<void> = output<void>();
}
