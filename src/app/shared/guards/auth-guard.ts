import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from '@angular/core';
import {AuthApiService} from '../../core/services/auth-api-service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService: AuthApiService = inject(AuthApiService);
  const router: Router = inject(Router);

  if (authService.isAuthenticated()) return true;
  return router.createUrlTree(['/auth/login']);
}
