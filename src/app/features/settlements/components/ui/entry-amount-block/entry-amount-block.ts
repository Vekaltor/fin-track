import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {AmountColorDirective} from '@shared/directives/amount-color-directive';
import {CurrencyPlnPipe} from '@shared/pipes/currency-pln-pipe';
import {AmountTone} from '@shared/models/types/amount-tone.type';
import {EntryStatus} from '@core/models/entry-status.enum';
import {EntryType} from '@core/models/entry-type.enum';
import {SettlementEntry} from '@core/models/settlement-entry.interface';
import {getEntryProgressPercent} from '../../../utils/settlement-calculations.util';

@Component({
  selector: 'app-entry-amount-block',
  imports: [CurrencyPlnPipe, AmountColorDirective],
  templateUrl: './entry-amount-block.html',
})
export class EntryAmountBlock {
  public readonly entry: InputSignal<SettlementEntry> = input.required<SettlementEntry>();

  protected readonly amountTone: Signal<AmountTone> = computed(() => {
    if (this.entry().status === EntryStatus.ARCHIVED) {
      return 'muted';
    }
    return this.entry().type === EntryType.RECEIVABLE ? 'positive' : 'negative';
  });

  protected readonly progressPercent: Signal<number> = computed(() =>
    getEntryProgressPercent(this.entry())
  );

  protected readonly installmentCount: Signal<number> = computed(
    () => this.entry().installments.length
  );
}
