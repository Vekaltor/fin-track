import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {AmountColorDirective} from '@shared/directives/amount-color-directive';
import {CurrencyPlnPipe} from '@shared/pipes/currency-pln-pipe';
import {AmountTone} from '@shared/models/types/amount-tone.type';
import {SettlementsSummary} from '@core/models/settlements-summary.interface';
import {SummaryCard} from '../summary-card/summary-card';
import {SettlementsFacade} from '../../store/settlements.facade';

@Component({
  selector: 'app-summary-cards',
  imports: [AsyncPipe, SummaryCard, CurrencyPlnPipe, AmountColorDirective],
  templateUrl: './summary-cards.html',
})
export class SummaryCards {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);

  protected balanceTone(summary: SettlementsSummary): AmountTone {
    if (summary.balance > 0) {
      return 'positive';
    }
    if (summary.balance < 0) {
      return 'negative';
    }
    return 'neutral';
  }
}
