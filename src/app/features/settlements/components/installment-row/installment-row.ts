import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroCheck, heroTrash, heroXMark} from '@ng-icons/heroicons/outline';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {CurrencyPlnPipe} from '@shared/pipes/currency-pln.pipe';
import {ShortDatePlPipe} from '@shared/pipes/short-date.pipe';
import {Installment} from '@core/models/installment.interface';
import {InstallmentStatus} from '@core/models/installment-status.enum';

@Component({
  selector: 'app-installment-row',
  imports: [NgIcon, AppButton, CurrencyPlnPipe, ShortDatePlPipe],
  providers: [provideIcons({heroCheck, heroTrash, heroXMark})],
  templateUrl: './installment-row.html',
})
export class InstallmentRow {
  public readonly installment: InputSignal<Installment> = input.required<Installment>();
  public readonly saving: InputSignal<boolean> = input<boolean>(false);

  public readonly pay: OutputEmitterRef<string> = output<string>();

  protected readonly InstallmentStatus = InstallmentStatus;

  protected onPay(): void {
    this.pay.emit(this.installment().id);
  }
}
