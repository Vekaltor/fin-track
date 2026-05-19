import {AuthenticatedUser} from './authenticated-user.interface';

export interface Authentication {
  user: AuthenticatedUser,
  token: string,
}
