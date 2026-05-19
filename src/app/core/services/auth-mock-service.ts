import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Authentication} from '../models/authentication.interface';
import {AuthenticatedUser} from '../models/authenticated-user.interface';
import {AuthenticateResponse} from '../models/authenticate-response.interface';
import {AuthService} from './auth-service';
import {ErrorHandlingService} from '../errors/error-handling-service';
import {BusinessErrorCode} from '../models/business-error-code.enum';


@Injectable({providedIn: 'root'})
export class AuthMockService extends AuthService {
  private errorHandling: ErrorHandlingService = inject(ErrorHandlingService);

  private mockUser = {
    id: "1",
    email: "jan@mail.com",
    password: "haslo123",
    name: "Jan Kowalski",
    token: "fake-jwt-token-xyz-123"
  };

  private authentication: WritableSignal<Authentication | null> = signal<Authentication | null>(null);
  public readonly isAuthenticated: Signal<boolean> = computed(() => !!this.authentication());
  public readonly currentUser: Signal<AuthenticatedUser | null> = computed(() => this.authentication()?.user ?? null);
  public readonly authToken: Signal<string | null> = computed(() => this.authentication()?.token ?? null);

  public login(email: string, password: string): Observable<AuthenticateResponse> {
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
        delay(500),
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

  public logout(): void {
    this.authentication.set(null);
  }
}
