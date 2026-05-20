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
  public readonly active: InputSignal<boolean> = input<boolean>(false);
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly className: InputSignal<string> = input<string>('');
  public readonly ariaLabel: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  public readonly clicked: OutputEmitterRef<MouseEvent> = output<MouseEvent>();

  protected readonly buttonClass: Signal<string> = computed((): string => {
    const base: string =
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition';
    const variant: ButtonVariant = this.variant();
    const sizeClasses: string =
      variant === 'ghost' || variant === 'link'
        ? ''
        : 'px-4 py-2';
    const stateClasses: string =
      this.disabled() || this.loading() ? 'opacity-75' : 'cursor-pointer';

    let variantClasses: string;
    if (variant === 'filter') {
      variantClasses = this.active()
        ? 'bg-primary text-white border border-primary px-3 py-1.5 text-sm'
        : 'bg-white text-dark border border-gray-200 hover:border-gray-300 px-3 py-1.5 text-sm';
    } else {
      variantClasses = this.variants[variant];
    }

    return cn(base, sizeClasses, variantClasses, stateClasses, this.className());
  });

  private readonly variants: Record<Exclude<ButtonVariant, 'filter'>, string> = {
    primary: 'bg-primary text-white enabled:hover:bg-primary-hover',
    primary_outlined:
      'bg-primary/5 border border-primary text-primary enabled:hover:bg-primary/10',
    secondary: 'bg-white border border-gray-200 text-dark enabled:hover:bg-gray-50',
    danger: 'bg-debt text-white enabled:hover:bg-debt/90',
    danger_outlined:
      'bg-debt/5 border border-debt/30 text-debt enabled:hover:bg-debt/10',
    ghost:
      'border-0 bg-transparent p-2 text-muted enabled:hover:bg-gray-100',
    link: 'border-0 bg-transparent p-0 text-primary enabled:hover:underline text-sm',
  };

  protected handleClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
