import {AuthenticatedUser} from './authenticated-user.interface';

export interface AuthenticateResponse {
  user: AuthenticatedUser,
  token: string,
}
