import {Component, input, InputSignal} from '@angular/core';
import {CurrencyPlnPipe} from '@shared/pipes/currency-pln-pipe';
import {GroupTotals} from '@core/models/group-totals.interface';

@Component({
  selector: 'app-group-totals-display',
  imports: [CurrencyPlnPipe],
  templateUrl: './group-totals-display.html',
})
export class GroupTotalsDisplay {
  public readonly totals: InputSignal<GroupTotals> = input.required<GroupTotals>();
}
