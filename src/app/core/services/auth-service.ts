import {Injectable, Signal} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticateResponse} from '../models/authenticate-response.interface';
import {AuthenticatedUser} from '../models/authenticated-user.interface';

@Injectable()
export abstract class AuthService {
  abstract readonly isAuthenticated: Signal<boolean>;
  abstract readonly currentUser: Signal<AuthenticatedUser | null>;
  abstract readonly authToken: Signal<string | null>;

  abstract login(email: string, password: string): Observable<AuthenticateResponse>;
  abstract logout(): void;
}
