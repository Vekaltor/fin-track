import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth-service';
import {toObservable} from '@angular/core/rxjs-interop';
import {filter, map, Observable, take} from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return toObservable(authService.isInitializing).pipe(
    filter(isInitializing => !isInitializing),
    take(1),
    map(() => {
      return authService.isAuthenticated()
        ? true
        : router.createUrlTree(['/login']);
    })
  );
}
