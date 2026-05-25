import {HttpContext} from '@angular/common/http';
import {HTTP_OPERATION_ID} from '@core/interceptors/http-operation-token';

/**
 * Creates an HTTP context configuration to track the request in the loading state.
 * Use this to associate an HTTP request with a named operation ID,
 * allowing the LoadingService to monitor its pending status.
 *
 * @param operationId - A unique string identifying the operation (e.g. from SETTLEMENT_OPERATIONS).
 * @returns An HttpContext instance with HTTP_OPERATION_ID set.
 */
export function withOperationId(operationId: string): HttpContext {
  return new HttpContext().set(HTTP_OPERATION_ID, operationId);
}
