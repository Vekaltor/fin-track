import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {SKIP_AUTH_TOKEN} from './skip-auth-token';
import {AuthService} from '../services/auth-service';


export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.context.get(SKIP_AUTH_TOKEN)) {
    return next(req);
  }
  const authToken: string | null = inject(AuthService).authToken();
  const isLogged: boolean = !!authToken;

  if (!isLogged) {
    return next(req);
  }

  const newReq: HttpRequest<unknown> = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken!)
  })

  return next(newReq);
}
