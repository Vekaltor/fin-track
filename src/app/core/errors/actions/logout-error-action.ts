import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppError} from '../../models/app-error.interface';
import {ErrorAction} from '../../models/error-action.interface';

@Injectable({providedIn: 'root'})
export class LogoutErrorAction implements ErrorAction {
  private router: Router = inject(Router);

  execute(error: AppError): void {
    localStorage.clear();
    void this.router.createUrlTree(['/login']);
  }
}
