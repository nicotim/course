import { Routes } from '@angular/router';
import { roleGuardAdmin } from '@core/guards/role.guard';

export const admin_routes: Routes = [
  {
    path: 'courses',
    loadComponent: () =>
      import('./course-management/course-management.component').then(
        (c) => c.CourseManagementComponent
      ),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./platform-analytics/platform-analytics.component').then(
        (c) => c.PlatformAnalyticsComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./user-management/user-management.component').then(
        (c) => c.UserManagementComponent
      ),
  },

  {
    path: '',
    loadComponent: () =>
      import('./dashboard-admin.component').then(
        (c) => c.DashboardAdminComponent
      ),
  },
];
