import {Routes} from '@angular/router';
import {guestGuard} from '@core/guards/guest-guard';
import {authGuard} from '@core/guards/auth-guard';
import {MainLayout} from '@core/components/layout/main-layout/main-layout';
import {provideSettlementsStore} from '@features/settlements/store/settlements.providers';

export const appRoutes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    component: MainLayout,
    children: [
      {
        path:"",
        loadComponent: () => import("./pages/dashboard-page/dashboard-page").then(c => c.DashboardPage),
      },
      {
        path: "accounts",
        loadComponent: () => import("./pages/accounts-page/accounts-page").then(c => c.AccountsPage),
      },
      {
        path: "settlements",
        providers: [provideSettlementsStore()],
        loadComponent: () => import("./pages/settlements-page/settlements-page").then(c => c.SettlementsPage),
      },
    ]
  },
  {
    path: "auth",
    loadChildren: () => import("./features/auth/auth.routes").then(m => m.authRoutes),
    canActivate: [guestGuard]
  },
  {
    path: '404',
    component: MainLayout
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
