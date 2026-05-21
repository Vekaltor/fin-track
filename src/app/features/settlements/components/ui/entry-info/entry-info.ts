import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {AppBadge} from '@shared/components/ui/app-badge/app-badge';
import {ShortDatePlPipe} from '@shared/pipes/short-date-pipe';
import {
  ENTRY_STATUS_BADGE_VARIANT,
  ENTRY_STATUS_LABELS,
  ENTRY_TYPE_LABELS,
} from '../../../constants/entry-labels';
import {EntryType} from '@core/models/entry-type.enum';
import {SettlementEntry} from '@core/models/settlement-entry.interface';
import {getEntryProgressPercent} from '../../../utils/settlement-calculations.util';
import {EntryProgressBar} from '../entry-progress-bar/entry-progress-bar';

@Component({
  selector: 'app-entry-info',
  imports: [AppBadge, ShortDatePlPipe, EntryProgressBar],
  templateUrl: './entry-info.html',
})
export class EntryInfo {
  public readonly entry: InputSignal<SettlementEntry> = input.required<SettlementEntry>();

  protected readonly EntryType = EntryType;
  protected readonly typeLabels = ENTRY_TYPE_LABELS;
  protected readonly statusLabels = ENTRY_STATUS_LABELS;
  protected readonly statusBadgeVariant = ENTRY_STATUS_BADGE_VARIANT;

  protected readonly progressPercent: Signal<number> = computed(() =>
    getEntryProgressPercent(this.entry())
  );
}
