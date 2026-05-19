import {ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners} from '@angular/core';
import {PreloadAllModules, provideRouter, withPreloading} from '@angular/router';

import {appRoutes} from './app.routes';
import {authInterceptor} from './core/interceptors/auth-interceptor';
import {errorInterceptor} from './core/interceptors/error-interceptor';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ToastService} from './core/services/toast-service';
import {AuthApiService} from './core/services/auth-api-service';
import {AuthMockService} from './core/services/auth-mock-service';
import {AuthService} from './core/services/auth-service';
import {ErrorHandlingService} from './core/errors/error-handling-service';

const isMock: boolean = true;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    ToastService,
    {provide: ErrorHandler, useClass: ErrorHandlingService},

    // API MOCK SERVICES
    {provide: AuthService, useClass: isMock ? AuthMockService : AuthApiService}
  ]
};
