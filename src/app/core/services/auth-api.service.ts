import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Observable, take, tap} from 'rxjs';
import {AuthenticateResponse} from '../models/authenticate-response.interface';
import {Authentication} from '../models/authentication.interface';
import {HttpClient} from '@angular/common/http';
import {AuthenticatedUser} from '../models/authenticated-user.interface';
import {skipAuth} from '../helpers/skip-auth';
import {AuthService} from './auth.service';

@Injectable({providedIn: "root"})
export class AuthApiService extends AuthService {
  private http: HttpClient = inject(HttpClient);

  private authentication: WritableSignal<Authentication | null> = signal<Authentication | null>(null);
  public readonly isAuthenticated: Signal<boolean> = computed(() => !!this.authentication());
  public readonly currentUser: Signal<AuthenticatedUser | null> = computed(() => this.authentication()?.user ?? null)
  public readonly authToken: Signal<string | null> = computed(() => this.authentication()?.token ?? null);

  public login(email: string, password: string): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>('http://localhost:3000/users',
      {email, password},
      {context: skipAuth()}
    ).pipe(
      take(1),
      tap((res: AuthenticateResponse) => this.authentication.set(res))
    )
  }

  public logout(): void {
    this.authentication.set(null);
  }
}
