import {inject} from '@angular/core';
import {AuthApiService} from '../services/auth-api.service';
import {CanActivateFn, Router} from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  const authService: AuthApiService = inject(AuthApiService);
  const router: Router = inject(Router);
  const isLogged: boolean = authService.isAuthenticated();

  if (isLogged) {
    return router.createUrlTree(['/']);
  }
  return true;
}
