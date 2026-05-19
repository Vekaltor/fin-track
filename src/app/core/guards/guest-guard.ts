import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth-service';
import {toObservable} from '@angular/core/rxjs-interop';
import {filter, map, Observable, take} from 'rxjs';

export const guestGuard: CanActivateFn = (): Observable<UrlTree | boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return toObservable(authService.isInitializing).pipe(
    filter(isInitializing => !isInitializing),
    take(1),
    map(() => {
      return authService.isAuthenticated()
        ? router.createUrlTree(['/'])
        : true;
    })
  );
}
