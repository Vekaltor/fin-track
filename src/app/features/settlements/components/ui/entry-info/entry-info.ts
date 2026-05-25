import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {AppBadge} from '@shared/components/ui/app-badge/app-badge';
import {ShortDatePlPipe} from '@shared/pipes/short-date-pipe';
import {SETTLEMENT_STATUS_BADGE_VARIANT,} from '../../../constants/settlement-status-badge-variant';
import {SettlementType} from '@core/models/settlement-type.enum';
import {Settlement} from '@core/models/settlement.interface';
import {getEntryProgressPercent} from '@features/settlements/helpers/settlement-calculations';
import {EntryProgressBar} from '../entry-progress-bar/entry-progress-bar';
import {SETTLEMENT_TYPE_LABELS} from '@features/settlements/constants/settlement-type-labels';
import {SETTLEMENT_STATUS_LABELS} from '@features/settlements/constants/settlement-status-labels';

@Component({
  selector: 'app-entry-info',
  imports: [AppBadge, ShortDatePlPipe, EntryProgressBar],
  templateUrl: './entry-info.html',
})
export class EntryInfo {
  public readonly entry: InputSignal<Settlement> = input.required<Settlement>();

  protected readonly EntryType = SettlementType;
  protected readonly typeLabels = SETTLEMENT_TYPE_LABELS;
  protected readonly statusLabels = SETTLEMENT_STATUS_LABELS;
  protected readonly statusBadgeVariant = SETTLEMENT_STATUS_BADGE_VARIANT;

  protected readonly progressPercent: Signal<number> = computed(() =>
    getEntryProgressPercent(this.entry())
  );
}
