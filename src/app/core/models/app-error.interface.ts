import {ErrorCode} from './error-code.type';

export interface AppError {
  code: ErrorCode;
  message?: string;
  originalError: unknown;
}
