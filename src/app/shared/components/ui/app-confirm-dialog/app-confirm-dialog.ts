import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {ConfirmDialogTone} from '@shared/models/types/confirm-dialog-tone.type';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-confirm-dialog',
  imports: [AppButton, NgIcon],
  templateUrl: './app-confirm-dialog.html',
})
export class AppConfirmDialog {
  public readonly open: InputSignal<boolean> = input.required<boolean>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly message: InputSignal<string> = input<string>('');
  public readonly confirmLabel: InputSignal<string> = input<string>('Potwierdź');
  public readonly cancelLabel: InputSignal<string> = input<string>('Anuluj');
  public readonly tone: InputSignal<ConfirmDialogTone> = input<ConfirmDialogTone>('primary');
  public readonly iconName: InputSignal<string> = input<string>('heroExclamationTriangle');
  public readonly loading: InputSignal<boolean> = input<boolean>(false);

  public readonly confirmed: OutputEmitterRef<void> = output<void>();
  public readonly cancelled: OutputEmitterRef<void> = output<void>();

  protected iconWrapperClass(): string {
    const toneClasses: Record<ConfirmDialogTone, string> = {
      danger: 'bg-debt/10 text-debt',
      warning: 'bg-primary/10 text-primary',
      primary: 'bg-primary/10 text-primary',
    };
    return cn(
      'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
      toneClasses[this.tone()]
    );
  }

  protected confirmButtonVariant(): 'danger_outlined' | 'primary' {
    return this.tone() === 'danger' ? 'danger_outlined' : 'primary';
  }

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
