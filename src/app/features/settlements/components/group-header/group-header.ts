import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {EntriesCountLabelPipe} from '../../pipes/entries-count-label.pipe';
import {GroupHeaderActions} from '../ui/group-header-actions/group-header-actions';
import {GroupTotalsDisplay} from '../ui/group-totals-display/group-totals-display';
import {FilteredSettlementGroup} from '@features/settlements/models/filtered-settlement-group.interface';

@Component({
  selector: 'app-group-header',
  imports: [
    EntriesCountLabelPipe,
    GroupHeaderActions,
    GroupTotalsDisplay,
  ],
  templateUrl: './group-header.html',
})
export class GroupHeader {
  public readonly group: InputSignal<FilteredSettlementGroup> = input.required<FilteredSettlementGroup>();

  public readonly addEntry: OutputEmitterRef<void> = output<void>();
  public readonly deleteGroup: OutputEmitterRef<void> = output<void>();
}
