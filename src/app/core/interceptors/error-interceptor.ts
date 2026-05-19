import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {ErrorHandlingService} from '../errors/error-handling-service';
import {mapHttpStatusToErrorCode} from '../errors/map-http-status-to-error-code';
import {ErrorCode} from '../models/error-code.type';

export const errorInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const errorHandlingService: ErrorHandlingService = inject(ErrorHandlingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let code: ErrorCode;
      let message: string;

      if (error.error && typeof error.error === 'object' && 'code' in error.error) {
        code = error.error.code;
        message = error.error.message || 'An error occurred';
      } else {
        const mapped = mapHttpStatusToErrorCode(error.status);
        code = mapped.code;
        message = mapped.message;
      }

      errorHandlingService.handle({
        code,
        message,
        originalError: error
      });

      return throwError(() => error);
    })
  )
}
