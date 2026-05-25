import {Component, input, InputSignal} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroArrowTrendingUp, heroClock} from '@ng-icons/heroicons/outline';
import {SettlementType} from '@core/models/settlement-type.enum';

@Component({
  selector: 'app-entry-type-icon',
  imports: [NgIcon],
  providers: [provideIcons({heroClock, heroArrowTrendingUp})],
  templateUrl: './entry-type-icon.html',
})
export class EntryTypeIcon {
  public readonly type: InputSignal<SettlementType> = input.required<SettlementType>();

  protected readonly SettlementType = SettlementType;
}
