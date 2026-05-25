import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {LoadingService} from '@core/services/loading-service';
import {HTTP_OPERATION_ID} from '@core/interceptors/http-operation-token';
import {finalize} from 'rxjs';

export const loadingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService: LoadingService = inject(LoadingService);
  const operationId: string = req.context.get(HTTP_OPERATION_ID);

  if (!operationId) {
    return next(req);
  }

  loadingService.start(operationId);

  return next(req).pipe(
    finalize((): void => loadingService.stop(operationId))
  );
};
