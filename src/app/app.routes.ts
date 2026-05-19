import {Routes} from '@angular/router';
import {authGuard} from './shared/guards/auth-guard';
import {guestGuard} from './shared/guards/guest-guard';

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
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
