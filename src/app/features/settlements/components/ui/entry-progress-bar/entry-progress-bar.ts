import {Component, input, InputSignal} from '@angular/core';
import {SettlementType} from '@core/models/settlement-type.enum';

@Component({
  selector: 'app-entry-progress-bar',
  templateUrl: './entry-progress-bar.html',
})
export class EntryProgressBar {
  public readonly percent: InputSignal<number> = input.required<number>();
  public readonly type: InputSignal<SettlementType> = input.required<SettlementType>();

  protected readonly EntryType = SettlementType;
}
