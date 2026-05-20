import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';

@Component({
  selector: 'app-modal',
  imports: [AppButton],
  templateUrl: './app-modal.html',
})
export class AppModal {
  public readonly open: InputSignal<boolean> = input.required<boolean>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly message: InputSignal<string> = input<string>('');
  public readonly confirmLabel: InputSignal<string> = input<string>('Potwierdź');
  public readonly cancelLabel: InputSignal<string> = input<string>('Anuluj');
  public readonly confirmVariant: InputSignal<'danger' | 'primary'> =
    input<'danger' | 'primary'>('primary');
  public readonly loading: InputSignal<boolean> = input<boolean>(false);

  public readonly confirmed: OutputEmitterRef<void> = output<void>();
  public readonly cancelled: OutputEmitterRef<void> = output<void>();

  protected onBackdropClick(): void {
    this.cancelled.emit();
  }

  protected onCancel(): void {
    this.cancelled.emit();
  }

  protected onConfirm(): void {
    this.confirmed.emit();
  }
}
