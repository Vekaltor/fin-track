import {inject, Injectable} from '@angular/core';
import {ToastErrorAction} from './actions/toast-error-action';
import {LogoutErrorAction} from './actions/logout-error-action';

@Injectable({providedIn: 'root'})
export class ErrorActions {
  public readonly showToast: ToastErrorAction = inject(ToastErrorAction);
  public readonly handleLogout: LogoutErrorAction = inject(LogoutErrorAction);
}
