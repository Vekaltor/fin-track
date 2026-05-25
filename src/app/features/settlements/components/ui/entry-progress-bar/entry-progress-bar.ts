import {Component, input, InputSignal} from '@angular/core';
import {SettlementType} from '@core/models/settlement-type.enum';

@Component({
  selector: 'app-entry-progress-bar',
  templateUrl: './entry-progress-bar.html',
})
export class EntryProgressBar {
  public readonly percent: InputSignal<number> = input.required();
  public readonly type: InputSignal<SettlementType> = input.required();

  protected readonly EntryType = SettlementType;
}
