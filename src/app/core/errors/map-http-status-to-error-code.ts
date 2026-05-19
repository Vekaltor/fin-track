import {HttpErrorCode} from '../models/http-error-code.enum';

interface MappedError {
  code: HttpErrorCode;
  message: string;
}

export const mapHttpStatusToErrorCode = (status: number): MappedError => {
  switch (status) {
    case 401:
      return {
        code: HttpErrorCode.UNKNOWN,
        message: 'Your session has expired. Please log in again.'
      };
    case 403:
      return {
        code: HttpErrorCode.FORBIDDEN,
        message: 'You do not have permission to access this resource.'
      };
    case 404:
      return {
        code: HttpErrorCode.NOT_FOUND,
        message: 'Requested resource not found.'
      };
    case 500:
      return {
        code: HttpErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Critical server error. Please try again later.'
      };
    default:
      return {
        code: HttpErrorCode.UNKNOWN,
        message: 'Something went wrong. Please try again.'
      };
  }
};
