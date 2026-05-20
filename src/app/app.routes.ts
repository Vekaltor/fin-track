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
        loadComponent: () => import("./pages/dashboard-view/dashboard-view").then(c => c.DashboardView),
      },
      {
        path: "accounts",
        canActivate: [authGuard],
        loadComponent: () => import("./pages/accounts-view/accounts-view").then(c => c.AccountsView),
      },
      {
        path: "settlements",
        canActivate: [authGuard],
        providers: [provideSettlementsStore()],
        loadComponent: () => import("./pages/settlements-view/settlements-view").then(c => c.SettlementsView),
      },
      // {
      //   path: "analisys",
      //   canActivate: [authGuard]
      // },
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
