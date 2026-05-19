import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthApiService} from '../services/auth-api-service';
import {SKIP_AUTH_TOKEN} from './skip-auth-token';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.context.get(SKIP_AUTH_TOKEN)) {
    return next(req);
  }
  const authToken: string | null = inject(AuthApiService).authToken();
  const isLogged: boolean = !!authToken;

  if (!isLogged) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken!)
  })

  return next(newReq);
}
