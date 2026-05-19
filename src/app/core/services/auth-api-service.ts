import {inject, Injectable} from '@angular/core';
import {catchError, Observable, of, take, tap, throwError} from 'rxjs';
import {AuthenticateResponse} from '../models/authenticate-response.interface';
import {HttpClient} from '@angular/common/http';
import {skipAuth} from '../helpers/skip-auth';
import {AuthService} from './auth-service';

@Injectable({providedIn: "root"})
export class AuthApiService extends AuthService {
  private http: HttpClient = inject(HttpClient);
  private readonly API_URL: string = 'http://localhost:3000/auth';

  public override initAuth(): void {
    this.refreshToken().pipe(take(1)).subscribe();
  }

  public override login(email: string, password: string): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.API_URL}/login`, {email, password}, {
      context: skipAuth(),
      withCredentials: true,
    }).pipe(
      take(1),
      tap((res: AuthenticateResponse) => this.authentication.set(res))
    )
  }

  public override logout(): void {
    this.authentication.set(null);
    this.http.post(`${this.API_URL}/logout`, {}, {withCredentials: true})
      .pipe(
        take(1),
        catchError(() => of(null))
      )
      .subscribe();
  }

  public override refreshToken(): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.API_URL}/refresh`, {}, {
      withCredentials: true
    }).pipe(
      take(1),
      tap((res: AuthenticateResponse) => this.authentication.set(res)),
      catchError((err) => {
        return throwError(() => new Error('Refresh token failed'));
      })
    );
  }
}
