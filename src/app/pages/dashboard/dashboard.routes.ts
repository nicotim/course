import { Routes } from '@angular/router';

export const dashboard_routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./dashboard-admin/dashboard-admin.component').then(
        (c) => c.DashboardAdminComponent
      ),
  },
  {
    path: 'teacher',
    loadComponent: () =>
      import('./dashboard-teacher/dashboard-teacher.component').then(
        (c) => c.DashboardTeacherComponent
      ),
  },
  {
    path: 'student',
    loadComponent: () =>
      import('./dashboard-student/dashboard-student.component').then(
        (c) => c.DashboardStudentComponent
      ),
  },
];

// Ver como hacer para que una vez que tenga los roles definidos, hacer que solo se pueda ir al rol que te corresponde
