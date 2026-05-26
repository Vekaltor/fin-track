import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {ToastService} from '../../services/toast-service';
import {Toast as IToast} from "../../models/toast.interface"
import {ToastType} from '@core/models/toast-type.enum';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast {
  private toastService: ToastService = inject(ToastService);

  protected toasts: Signal<IToast[]> = this.toastService.toasts;

  protected getToastClass(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS:
        return 'bg-[#10b981] border-[#047857]';
      case ToastType.ERROR:
        return 'bg-[#ef4444] border-[#b91c1c]';
      default:
        return '';
    }
  }

  protected remove(id: string, timeoutId: number): void {
    this.toastService.cancelMessage(id, timeoutId);
  }

  protected readonly cn = cn;
}
