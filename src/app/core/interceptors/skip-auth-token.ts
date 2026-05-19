import {HttpContextToken} from '@angular/common/http';

/**
 * HTTP Context token used to signal whether the authentication interceptor
 * should skip adding the Authorization Bearer header to the outgoing request.
 * * @default false (Requests are secure by default and require authentication)
 * * @see {@link skipAuth} for the helper function used to enable this token.
 */
export const SKIP_AUTH_TOKEN: HttpContextToken<boolean> =
  new HttpContextToken<boolean>((): boolean => false);
