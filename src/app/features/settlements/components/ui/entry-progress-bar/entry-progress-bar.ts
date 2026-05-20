import {Component, input, InputSignal} from '@angular/core';
import {EntryType} from '@core/models/entry-type.enum';

@Component({
  selector: 'app-entry-progress-bar',
  templateUrl: './entry-progress-bar.html',
})
export class EntryProgressBar {
  public readonly percent: InputSignal<number> = input.required<number>();
  public readonly type: InputSignal<EntryType> = input.required<EntryType>();

  protected readonly EntryType = EntryType;
}
