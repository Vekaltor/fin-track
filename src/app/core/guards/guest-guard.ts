import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth-service';

export const guestGuard: CanActivateFn = (): UrlTree | boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isLogged: boolean = authService.isAuthenticated();

  if (isLogged) return router.createUrlTree(['/']);
  return true;
}
