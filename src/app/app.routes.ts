import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivateChild: [publicGuard()],
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((c) => c.auth_routes),
  },
  {
    path: 'dashboard',
    canActivateChild: [privateGuard()],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then(
        (c) => c.dashboard_routes
      ),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq/faq.component').then((c) => c.FaqComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
