import {Component, computed, inject, Signal} from '@angular/core';
import {AmountColorDirective} from '@shared/directives/amount-color-directive';
import {CurrencyPlnPipe} from '@shared/pipes/currency-pln-pipe';
import {AmountTone} from '@shared/models/types/amount-tone.type';
import {SummaryCard} from '@features/settlements/components/ui/summary-card/summary-card';
import {SettlementsFacade} from '@features/settlements/store/settlements.facade';
import {toSignal} from '@angular/core/rxjs-interop';
import {SettlementsSummary} from '@features/settlements/models/settlements-summary.interface';

@Component({
  selector: 'app-summary-cards',
  imports: [SummaryCard, CurrencyPlnPipe, AmountColorDirective],
  templateUrl: './summary-cards.html',
})
export class SummaryCards {
  private readonly facade: SettlementsFacade = inject(SettlementsFacade);

  protected readonly vm = toSignal(this.facade.vm$);

  public readonly summary: SettlementsSummary | undefined = this.vm()?.summary;

  protected readonly balanceTone: Signal<AmountTone> = computed((): AmountTone => {
    const balance: number = this.summary?.balance ?? 0;
    if (balance > 0) return 'positive';
    if (balance < 0) return 'negative';
    return 'neutral';
  });
}
