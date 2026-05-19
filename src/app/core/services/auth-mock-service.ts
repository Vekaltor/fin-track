import {inject, Injectable} from '@angular/core';
import {Observable, of, take, tap, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {AuthenticateResponse} from '../models/authenticate-response.interface';
import {AuthService} from './auth-service';
import {ErrorHandlingService} from '../errors/error-handling-service';
import {BusinessErrorCode} from '../models/business-error-code.enum';

@Injectable({providedIn: 'root'})
export class AuthMockService extends AuthService {
  private errorHandling: ErrorHandlingService = inject(ErrorHandlingService);

  private readonly MOCK_COOKIE_KEY: string = 'mock_http_only_refresh_token_exists';
  private mockUser: any = {
    id: "1",
    email: "user@user.pl",
    password: "123",
    name: "Jan Kowalski",
    token: "fake-jwt-token-xyz-123"
  };

  public override initAuth(): void {
    const hasCookie: string | null = sessionStorage.getItem(this.MOCK_COOKIE_KEY);
    if (hasCookie) this.refreshToken().pipe(take(1)).subscribe();
  }

  public override login(email: string, password: string): Observable<AuthenticateResponse> {
    if (email === this.mockUser.email && password === this.mockUser.password) {

      const response: AuthenticateResponse = {
        user: {
          id: this.mockUser.id,
          email: this.mockUser.email,
          name: this.mockUser.name,
        },
        token: this.mockUser.token,
      };

      return of(response).pipe(
        take(1),
        delay(500),
        tap((res: AuthenticateResponse): void => {
          this.authentication.set(res);
          sessionStorage.setItem(this.MOCK_COOKIE_KEY, 'true');
        })
      );
    } else {
      this.errorHandling.handle({
        code: BusinessErrorCode.UNAUTHORIZED,
        message: "Nieprawidłowy email lub hasło.",
        originalError: undefined
      });
      return throwError(() => new Error('Auth failed'));
    }
  }

  public override logout(): void {
    this.authentication.set(null);
    sessionStorage.removeItem(this.MOCK_COOKIE_KEY);
  }

  public override refreshToken(): Observable<AuthenticateResponse> {
    const hasCookie = sessionStorage.getItem(this.MOCK_COOKIE_KEY);

    if (!hasCookie) {
      this.logout();
      return throwError(() => new Error('No refresh token cookie found'));
    }

    const response: AuthenticateResponse = {
      user: {id: this.mockUser.id, email: this.mockUser.email, name: this.mockUser.name},
      token: "new-refreshed-fake-jwt-token-" + Math.random().toString(36).substr(2, 5),
    };

    return of(response).pipe(
      delay(300),
      tap((res: AuthenticateResponse) => this.authentication.set(res))
    );
  }
}
