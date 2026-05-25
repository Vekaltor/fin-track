import {
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import {InstallmentStatus} from '@core/models/installment-status.enum';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {InstallmentPanelHeader} from '../ui/installment-panel-header/installment-panel-header';
import {InstallmentRow} from '../installment-row/installment-row';
import {Settlement} from '@core/models/settlement.interface';

@Component({
  selector: 'app-installment-panel',
  imports: [InstallmentPanelHeader, InstallmentRow, AppButton],
  templateUrl: './installment-panel.html',
})
export class InstallmentPanel {
  public readonly entry: InputSignal<Settlement> = input.required<Settlement>();
  public readonly saving: InputSignal<boolean> = input<boolean>(false);

  public readonly payInstallments: OutputEmitterRef<string[]> = output();

  protected readonly selectedIds: WritableSignal<Set<string>> = signal(new Set<string>());

  protected readonly unpaidInstallments = computed(() =>
    this.entry().installments.filter((inst) => inst.status === InstallmentStatus.UNPAID)
  );

  protected readonly selectedCount = computed(() => this.selectedIds().size);

  protected readonly hasSelection = computed(() => this.selectedCount() > 0);

  protected isSelected(installmentId: string): boolean {
    return this.selectedIds().has(installmentId);
  }

  protected onSelectionChange(installmentId: string, checked: boolean): void {
    const next: Set<string> = new Set(this.selectedIds());
    if (checked) {
      next.add(installmentId);
    } else {
      next.delete(installmentId);
    }
    this.selectedIds.set(next);
  }

  protected onPaySingle(installmentId: string): void {
    this.emitPay([installmentId]);
  }

  protected onPaySelected(): void {
    const ids: string[] = [...this.selectedIds()];
    this.emitPay(ids);
  }

  private emitPay(installmentIds: string[]): void {
    if (installmentIds.length === 0) return;
    this.selectedIds.set(new Set());
    this.payInstallments.emit(installmentIds);
  }
}
