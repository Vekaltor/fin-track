import {inject} from '@angular/core';
import {AuthApiService} from '../../core/services/auth-api-service';
import {CanActivateFn, Router, UrlTree} from '@angular/router';

export const guestGuard: CanActivateFn = (): UrlTree | boolean => {
  const authService: AuthApiService = inject(AuthApiService);
  const router: Router = inject(Router);
  const isLogged: boolean = authService.isAuthenticated();

  if (isLogged) return router.createUrlTree(['/']);
  return true;
}
