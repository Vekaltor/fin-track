import {SKIP_AUTH} from '../interceptors/skip-auth.token';
import {HttpContext} from '@angular/common/http';

export function skipAuth() {
  return new HttpContext().set(SKIP_AUTH, false);
}
