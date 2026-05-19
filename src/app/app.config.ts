import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {appRoutes} from './app.routes';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {errorInterceptor} from './core/interceptors/error.interceptor';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ToastService} from './core/services/toast.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    ToastService
  ]
};
