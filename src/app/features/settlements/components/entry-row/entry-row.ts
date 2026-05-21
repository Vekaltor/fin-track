import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {SettlementEntry} from '@core/models/settlement-entry.interface';
import {EntryAmountBlock} from '../ui/entry-amount-block/entry-amount-block';
import {EntryInfo} from '../ui/entry-info/entry-info';
import {EntryRowActions} from '../ui/entry-row-actions/entry-row-actions';
import {EntryTypeIcon} from '../ui/entry-type-icon/entry-type-icon';
import {InstallmentPanel} from '../installment-panel/installment-panel';

@Component({
  selector: 'app-entry-row',
  imports: [
    EntryTypeIcon,
    EntryInfo,
    EntryAmountBlock,
    EntryRowActions,
    InstallmentPanel,
  ],
  templateUrl: './entry-row.html',
})
export class EntryRow {
  public readonly entry: InputSignal<SettlementEntry> = input.required<SettlementEntry>();
  public readonly groupId: InputSignal<string> = input.required<string>();
  public readonly expanded: InputSignal<boolean> = input<boolean>(false);
  public readonly saving: InputSignal<boolean> = input<boolean>(false);

  public readonly toggleExpanded: OutputEmitterRef<void> = output<void>();
  public readonly deleteEntry: OutputEmitterRef<void> = output<void>();
  public readonly archiveEntry: OutputEmitterRef<void> = output<void>();
  public readonly payInstallments: OutputEmitterRef<{
    entryId: string;
    installmentIds: readonly string[];
  }> = output();
}
