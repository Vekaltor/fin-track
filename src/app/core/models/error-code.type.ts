import {HttpErrorCode} from './http-error-code.enum';
import {BusinessErrorCode} from './business-error-code.enum';

export type ErrorCode = HttpErrorCode | BusinessErrorCode;
