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
      case ToastType.WARNING:
        this.onWarning(message, duration);
        break;
      case ToastType.INFO:
        this.onInfo(message, duration);
        break;
    }
  }

  public cancelMessage(toastId: string, timeoutId?: number): void {
    timeoutId && clearTimeout(timeoutId);
    this._toasts.update((prev: Toast[]): Toast[] => prev.filter((toast: Toast): boolean => toast.id != toastId))
  }

  private onSuccess(message: string, duration: number = this.DEFAULT_DURATION_TIME): void {
    const id: string = crypto.randomUUID();
    this._toasts.update((prev: Toast[]): Toast[] => [...prev, {
      id,
      duration,
      message,
      type: ToastType.SUCCESS,
      timeoutId: this.startAutoRemoveTimer(id, duration),
    }]);
  }

  private onError(message: string, duration: number = this.DEFAULT_DURATION_TIME): void {
    const id: string = crypto.randomUUID();
    this._toasts.update((prev: Toast[]): Toast[] => [...prev, {
      id,
      duration,
      message,
      type: ToastType.ERROR,
      timeoutId: this.startAutoRemoveTimer(id, duration),
    }]);
  }

  private onInfo(message: string, duration: number = this.DEFAULT_DURATION_TIME): void {
    const id: string = crypto.randomUUID();
    this._toasts.update((prev: Toast[]): Toast[] => [...prev, {
      id,
      duration,
      message,
      type: ToastType.INFO,
      timeoutId: this.startAutoRemoveTimer(id, duration),
    }]);
  }

  private onWarning(message: string, duration: number = this.DEFAULT_DURATION_TIME): void {
    const id: string = crypto.randomUUID();
    this._toasts.update((prev: Toast[]): Toast[] => [...prev, {
      id,
      duration,
      message,
      type: ToastType.WARNING,
      timeoutId: this.startAutoRemoveTimer(id, duration),
    }]);
  }

  private startAutoRemoveTimer(toastId: string, duration: number): number {
    return setTimeout((): void => this.cancelMessage(toastId), duration);
  }
}
