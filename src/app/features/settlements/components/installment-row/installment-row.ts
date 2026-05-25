import {Component, computed, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroCheck} from '@ng-icons/heroicons/outline';
import {InstallmentStatus} from '@core/models/installment-status.enum';
import {
  getPlannedDueDate,
  isInstallmentRescheduled,
} from '@features/settlements/helpers/installment-schedule';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {CurrencyPlnPipe} from '@shared/pipes/currency-pln-pipe';
import {ShortDatePlPipe} from '@shared/pipes/short-date-pipe';
import {Installment} from '@core/models/installment.interface';

@Component({
  selector: 'app-installment-row',
  imports: [NgIcon, AppButton, CurrencyPlnPipe, ShortDatePlPipe],
  providers: [provideIcons({heroCheck})],
  templateUrl: './installment-row.html',
})
export class InstallmentRow {
  public readonly installment: InputSignal<Installment> = input.required<Installment>();
  public readonly saving: InputSignal<boolean> = input<boolean>(false);
  public readonly selected: InputSignal<boolean> = input<boolean>(false);

  public readonly pay: OutputEmitterRef<string> = output<string>();
  public readonly selectionChange: OutputEmitterRef<boolean> = output<boolean>();

  protected readonly InstallmentStatus = InstallmentStatus;

  protected readonly isRescheduled = computed(() =>
    isInstallmentRescheduled(this.installment())
  );

  protected readonly plannedDueDate = computed(() =>
    getPlannedDueDate(this.installment())
  );

  protected readonly isUnpaid = computed(
    () => this.installment().status === InstallmentStatus.UNPAID
  );

  protected onPay(): void {
    this.pay.emit(this.installment().id);
  }

  protected onCheckboxChange(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.selectionChange.emit(target.checked);
  }
}
