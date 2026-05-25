import {Component, input, InputSignal} from '@angular/core';
import {CurrencyPlnPipe} from '@shared/pipes/currency-pln-pipe';
import {AmountColorDirective} from '@shared/directives/amount-color-directive';
import {AmountTone} from '@shared/models/types/amount-tone.type';

@Component({
  selector: 'app-summary-card',
  imports: [CurrencyPlnPipe, AmountColorDirective],
  templateUrl: './summary-card.html',
})
export class SummaryCard {
  public readonly label: InputSignal<string> = input.required();
  public readonly amount: InputSignal<number> = input.required();
  public readonly backgroundClass: InputSignal<string> = input.required();
  public readonly tone: InputSignal<AmountTone> = input<AmountTone>('neutral');
}
