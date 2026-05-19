import {AppError} from './app-error.interface';

export interface ErrorAction {
  execute(error: AppError): void;
}
