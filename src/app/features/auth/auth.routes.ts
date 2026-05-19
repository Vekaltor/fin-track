import {Routes} from '@angular/router';
import {LoginView} from './components/login-view/login-view';

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginView,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
