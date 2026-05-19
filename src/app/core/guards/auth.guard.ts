import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthApiService} from '../services/auth-api.service';

export const authGuard: CanActivateFn = () => {
  const authService: AuthApiService = inject(AuthApiService);
  const router: Router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
}
