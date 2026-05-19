import {inject, Injectable} from '@angular/core';
import {ToastType} from '../../models/toast-type.enum';
import {AppError} from '../../models/app-error.interface';
import {ToastService} from '../../services/toast-service';
import {ErrorAction} from '../../models/error-action.interface';

@Injectable({providedIn: 'root'})
export class ToastErrorAction implements ErrorAction {
  private toastService: ToastService = inject(ToastService);

  execute(error: AppError): void {
    const msg: string = error.message || 'An unexpected error occurred.';
    this.toastService.showMessage(ToastType.ERROR, msg);
  }
}
