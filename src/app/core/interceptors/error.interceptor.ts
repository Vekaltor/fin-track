import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastService} from '../services/toast.service';
import {catchError, throwError} from 'rxjs';
import {ToastType} from '../models/toast-type.enum';

export const errorInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const toastService: ToastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(error);
      toastService.showMessage(ToastType.ERROR, error.message);
      return throwError(() => error);
    })
  )
}
