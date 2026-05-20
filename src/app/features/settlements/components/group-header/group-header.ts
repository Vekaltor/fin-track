import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {EntriesCountLabelPipe} from '../../pipes/entries-count-label.pipe';
import {GroupTotals} from '@core/models/group-totals.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';
import {GroupColorDot} from '../ui/group-color-dot/group-color-dot';
import {GroupHeaderActions} from '../ui/group-header-actions/group-header-actions';
import {GroupTotalsDisplay} from '../ui/group-totals-display/group-totals-display';

@Component({
  selector: 'app-group-header',
  imports: [
    EntriesCountLabelPipe,
    GroupColorDot,
    GroupHeaderActions,
    GroupTotalsDisplay,
  ],
  templateUrl: './group-header.html',
})
export class GroupHeader {
  public readonly group: InputSignal<SettlementGroup> = input.required<SettlementGroup>();
  public readonly totals: InputSignal<GroupTotals> = input.required<GroupTotals>();
  public readonly visibleCount: InputSignal<number> = input.required<number>();

  public readonly addEntry: OutputEmitterRef<void> = output<void>();
  public readonly deleteGroup: OutputEmitterRef<void> = output<void>();
}
