import {Component, computed, input, InputSignal, output, OutputEmitterRef, Signal} from '@angular/core';
import {ButtonVariant} from '@shared/models/types/button-variant.type';
import {ButtonType} from '@shared/models/types/button-type.type';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './app-button.html',
})
export class AppButton {
  public readonly type: InputSignal<ButtonType> = input<ButtonType>('button');
  public readonly variant: InputSignal<ButtonVariant> = input<ButtonVariant>('primary');
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly className: InputSignal<string> = input<string>("");

  public readonly clicked: OutputEmitterRef<MouseEvent> = output<MouseEvent>();

  protected readonly buttonClass: Signal<string> = computed((): string => {
    const base = 'inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg transition relative font-medium';
    const stateClasses: string = (this.disabled() || this.loading())
      ? 'opacity-75'
      : 'cursor-pointer';

    return cn(base, this.variants[this.variant()], stateClasses, this.className());
  });

  private readonly variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white enabled:hover:bg-primary-hover',
    primary_outlined:
      'bg-primary/5 border border-primary text-primary enabled:hover:bg-primary/10',
    secondary:
      'bg-white border border-gray-200 text-dark enabled:hover:bg-gray-50',
    danger: 'bg-debt text-white enabled:hover:bg-debt/90',
    danger_outlined:
      'bg-debt/5 border border-debt/30 text-debt enabled:hover:bg-debt/10',
  };

  protected handleClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
