import {Toast} from '../models/toast.interface';
import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {ToastType} from '../models/toast-type.enum';

@Injectable({providedIn: "root"})
export class ToastService {
  private _toasts: WritableSignal<Toast[]> = signal<Toast[]>([]);
  private DEFAULT_DURATION_TIME: number = 3000;

  public readonly toasts: Signal<Toast[]> = this._toasts.asReadonly();

  public showMessage(type: ToastType, message: string, duration?: number): void {
    switch (type) {
      case ToastType.ERROR:
        this.onError(message, duration);
        break;
      case ToastType.SUCCESS:
        this.onSuccess(message, duration);
        break;
    }
  }

  public cancelMessage(id: string): void {
    this._toasts.update((prev: Toast[]) => prev.filter((toast: Toast): boolean => toast.id != id))
  }

  private onSuccess(message: string, duration: number = this.DEFAULT_DURATION_TIME): void {
    this._toasts.update((prev: Toast[]) => [...prev, {
      id: crypto.randomUUID(),
      duration,
      message,
      type: ToastType.SUCCESS
    }]);
  }

  private onError(message: string, duration: number = this.DEFAULT_DURATION_TIME): void {
    this._toasts.update((prev: Toast[]) => [...prev, {
      id: crypto.randomUUID(),
      duration,
      message,
      type: ToastType.ERROR
    }]);
  }
}
