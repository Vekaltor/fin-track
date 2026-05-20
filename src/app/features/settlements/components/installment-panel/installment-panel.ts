import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {SettlementEntry} from '@core/models/settlement-entry.interface';
import {InstallmentPanelHeader} from '../ui/installment-panel-header/installment-panel-header';
import {InstallmentRow} from '../installment-row/installment-row';

@Component({
  selector: 'app-installment-panel',
  imports: [InstallmentPanelHeader, InstallmentRow],
  templateUrl: './installment-panel.html',
})
export class InstallmentPanel {
  public readonly entry: InputSignal<SettlementEntry> = input.required<SettlementEntry>();
  public readonly groupId: InputSignal<string> = input.required<string>();
  public readonly saving: InputSignal<boolean> = input<boolean>(false);

  public readonly payInstallment: OutputEmitterRef<{
    entryId: string;
    installmentId: string;
  }> = output();

  protected onPay(installmentId: string): void {
    this.payInstallment.emit({
      entryId: this.entry().id,
      installmentId,
    });
  }
}
