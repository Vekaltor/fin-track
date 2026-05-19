import {computed, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticateResponse} from '../models/authenticate-response.interface';
import {AuthenticatedUser} from '../models/authenticated-user.interface';
import {Authentication} from '../models/authentication.interface';

@Injectable()
export abstract class AuthService {
  authentication: WritableSignal<Authentication | null> = signal<Authentication | null>(null);
  readonly currentUser: Signal<AuthenticatedUser | null> = computed(() => this.authentication()?.user ?? null)
  readonly authToken: Signal<string | null> = computed(() => this.authentication()?.token ?? null);
  readonly isAuthenticated: Signal<boolean> = computed((): boolean =>
    !!this.authentication() && this.validateToken(this.authentication()!.token)
  );

  abstract login(email: string, password: string): Observable<AuthenticateResponse>;

  abstract logout(): void;

  abstract initAuth(): void;

  abstract refreshToken(): Observable<AuthenticateResponse>;

  private validateToken(token?: string): boolean {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired: boolean = Math.floor(Date.now() / 1000) >= payload.exp;
      return !isExpired;
    } catch {
      return false;
    }
  }
}
