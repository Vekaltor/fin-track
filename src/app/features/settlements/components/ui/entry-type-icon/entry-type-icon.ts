import {Component, input, InputSignal} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroArrowTrendingUp, heroClock} from '@ng-icons/heroicons/outline';
import {EntryType} from '@core/models/entry-type.enum';

@Component({
  selector: 'app-entry-type-icon',
  imports: [NgIcon],
  providers: [provideIcons({heroClock, heroArrowTrendingUp})],
  templateUrl: './entry-type-icon.html',
})
export class EntryTypeIcon {
  public readonly type: InputSignal<EntryType> = input.required<EntryType>();

  protected readonly EntryType = EntryType;
}
