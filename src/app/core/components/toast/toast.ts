import {ChangeDetectionStrategy, Component, effect, inject, Signal} from '@angular/core';
import {ToastService} from '../../services/toast-service';
import {Toast as IToast} from "../../models/toast.interface"
import {ToastType} from '@core/models/toast-type.enum';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast {
  private toastService: ToastService = inject(ToastService);

  protected toasts: Signal<IToast[]> = this.toastService.toasts;
  private registeredTimers: Set<string> = new Set<string>();

  constructor() {
    effect((): void => {
      const currentToasts: IToast[] = this.toasts();

      currentToasts.forEach((toast: IToast): void => {
        if (this.registeredTimers.has(toast.id)) return;

        this.registeredTimers.add(toast.id);

        setTimeout((): void => {
          this.remove(toast.id);
        }, toast.duration);
      });
    });
  }

  protected getToastClass(type: ToastType): Record<string, boolean> {
    return {
      'bg-[#10b981] border-[#047857]': type === ToastType.SUCCESS,
      'bg-[#ef4444] border-[#b91c1c]': type === ToastType.ERROR,
    };
  }

  protected remove(id: string): void {
    this.registeredTimers.delete(id);
    this.toastService.cancelMessage(id);
  }
}
