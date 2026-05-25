import {Component, input, InputSignal} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {SettlementType} from '@core/models/settlement-type.enum';

@Component({
  selector: 'app-entry-type-icon',
  imports: [NgIcon],
  templateUrl: './entry-type-icon.html',
})
export class EntryTypeIcon {
  public readonly type: InputSignal<SettlementType> = input.required();

  protected readonly SettlementType = SettlementType;
}
