import {ChangeDetectionStrategy, Component, effect, inject, Signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {ToastService} from '../../services/toast.service';
import {Toast as IToast} from "../../models/toast.interface"

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
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

  protected remove(id: string): void {
    this.registeredTimers.delete(id);
    this.toastService.cancelMessage(id);
  }
}
