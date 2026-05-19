import {Routes} from '@angular/router';

export const authRoutes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component").then(c => c.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
