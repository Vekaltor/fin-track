import {HttpContextToken} from '@angular/common/http';

export const HTTP_OPERATION_ID: HttpContextToken<string> =
  new HttpContextToken<string>((): string => '');
