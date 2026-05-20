import {Directive, effect, ElementRef, inject, input, InputSignal} from '@angular/core';
import {AmountTone} from '@shared/models/types/amount-tone.type';

@Directive({
  selector: '[appAmountColor]',
})
export class AmountColorDirective {
  public readonly appAmountColor: InputSignal<AmountTone> =
    input.required<AmountTone>();

  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);

  constructor() {
    effect(() => {
      const tone: AmountTone = this.appAmountColor();
      const element: HTMLElement = this.el.nativeElement;
      element.classList.remove('text-receivable', 'text-debt', 'text-dark', 'text-muted');
      if (tone === 'positive') {
        element.classList.add('text-receivable');
      } else if (tone === 'negative') {
        element.classList.add('text-debt');
      } else if (tone === 'muted') {
        element.classList.add('text-muted');
      } else {
        element.classList.add('text-dark');
      }
    });
  }
}
