import {ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {PreloadAllModules, provideRouter, withPreloading} from '@angular/router';

import {appRoutes} from './app.routes';
import {authInterceptor} from '@core/interceptors/auth-interceptor';
import {errorInterceptor} from '@core/interceptors/error-interceptor';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ToastService} from '@core/services/toast-service';
import {AuthApiService} from '@core/services/auth-api-service';
import {AuthMockService} from '@core/services/auth-mock-service';
import {AuthService} from '@core/services/auth-service';
import {SettlementsApiService} from '@core/services/settlements-api-service';
import {SettlementsMockService} from '@core/services/settlements-mock-service';
import {SettlementsService} from '@core/services/settlements-service';
import {ErrorHandlingService} from '@core/errors/error-handling-service';
import {provideIcons} from '@ng-icons/core';
import * as heroOutline from '@ng-icons/heroicons/outline';

const isMock: boolean = true;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withPreloading(PreloadAllModules)
    ),
    provideIcons({...heroOutline}),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    ToastService,
    ErrorHandlingService,

    // API MOCK SERVICES
    {provide: AuthService, useClass: isMock ? AuthMockService : AuthApiService},
    {provide: SettlementsService, useClass: isMock ? SettlementsMockService : SettlementsApiService},
  ]
};
