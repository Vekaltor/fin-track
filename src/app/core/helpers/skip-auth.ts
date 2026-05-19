import {SKIP_AUTH_TOKEN} from '../interceptors/skip-auth-token';
import {HttpContext} from '@angular/common/http';

/**
 * Creates an HTTP context configuration to bypass authentication.
 * Use this when making public API calls that do not require an Authorization header.
 * * @returns An HttpContext instance with SKIP_AUTH_TOKEN enabled.
 */
export function skipAuth() {
  return new HttpContext().set(SKIP_AUTH_TOKEN, true);
}
