import { Routes } from '@angular/router';

export const teacher_routes: Routes = [
  {
    path: 'analytics',
    loadComponent: () =>
      import('./analytics/analytics.component').then(
        (c) => c.AnalyticsComponent
      ),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./course-management/course-management.component').then(
        (c) => c.CourseManagementComponent
      ),
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./student-management/student-management.component').then(
        (c) => c.StudentManagementComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./dashboard-teacher.component').then(
        (c) => c.DashboardTeacherComponent
      ),
  },
];
