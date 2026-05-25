import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {AmountColorDirective} from '@shared/directives/amount-color-directive';
import {CurrencyPlnPipe} from '@shared/pipes/currency-pln-pipe';
import {AmountTone} from '@shared/models/types/amount-tone.type';
import {SettlementStatus} from '@core/models/settlement-status.enum';
import {SettlementType} from '@core/models/settlement-type.enum';
import {Settlement} from '@core/models/settlement.interface';
import {getEntryProgressPercent} from '@features/settlements/helpers/settlement-calculations';
import {getInstallmentLabel} from '@features/settlements/helpers/get-installment-label';

@Component({
  selector: 'app-entry-amount-block',
  imports: [CurrencyPlnPipe, AmountColorDirective],
  templateUrl: './entry-amount-block.html',
})
export class EntryAmountBlock {
  public readonly entry: InputSignal<Settlement> = input.required();

  protected readonly amountTone: Signal<AmountTone> = computed(() => {
    if (this.entry().status === SettlementStatus.ARCHIVED) {
      return 'muted';
    }
    return this.entry().type === SettlementType.RECEIVABLE ? 'positive' : 'negative';
  });

  protected readonly progressPercent: Signal<number> = computed(() =>
    getEntryProgressPercent(this.entry())
  );

  protected readonly installmentCount: Signal<number> = computed(() =>
    this.entry().installments.length
  );

  protected readonly installmentLabel: Signal<string> = computed(() =>
    getInstallmentLabel(this.installmentCount())
  );
}
