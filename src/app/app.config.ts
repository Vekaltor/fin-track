import {ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {appRoutes} from './app.routes';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {errorInterceptor} from './core/interceptors/error.interceptor';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ToastService} from './core/services/toast.service';
import {AuthApiService} from './core/services/auth-api.service';
import {AuthMockService} from '../../mock-api/auth-mock-service';
import {AuthService} from './core/services/auth.service';
import {ErrorHandlingService} from './core/services/error-handling.service';

const isMock = true;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    ToastService,
    {provide: ErrorHandler, useClass: ErrorHandlingService},

    // API MOCK SERVICES
    {provide: AuthService, useClass: isMock ? AuthMockService : AuthApiService}
  ]
};
