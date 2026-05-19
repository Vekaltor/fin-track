import {Routes} from '@angular/router';
import {guestGuard} from './core/guards/guest-guard';
import {authGuard} from './core/guards/auth-guard';

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    canActivate: [authGuard],
    loadComponent: () => import("./features/dashboard/components/dashboard-view/dashboard-view").then(c => c.DashboardView),
  },
  // {
  //   path: "accounts",
  //   canActivate: [authGuard]
  // },
  // {
  //   path: "transactions",
  //   canActivate: [authGuard]
  // },
  // {
  //   path: "analisys",
  //   canActivate: [authGuard]
  // },
  {
    path: "auth",
    loadChildren: () => import("./features/auth/auth.routes").then(m => m.authRoutes),
    canActivate: [guestGuard]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
