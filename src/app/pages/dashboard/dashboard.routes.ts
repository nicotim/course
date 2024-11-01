import { Routes } from '@angular/router';
import {
  roleGuardAdmin,
  roleGuardStudent,
  roleGuardTeacher,
} from '@core/guards/role.guard';

export const dashboard_routes: Routes = [
  {
    path: 'admin',
    canActivate: [roleGuardAdmin()],
    canActivateChild: [roleGuardAdmin()],
    loadChildren: () =>
      import('./dashboard-admin/admin.routes').then((c) => c.admin_routes),
  },
  {
    path: 'teacher',
    canActivate: [roleGuardTeacher()],
    canActivateChild: [roleGuardTeacher()],
    loadChildren: () =>
      import('./dashboard-teacher/teacher.routes').then(
        (c) => c.teacher_routes
      ),
  },
  {
    path: 'student',
    canActivate: [roleGuardStudent()],
    canActivateChild: [roleGuardStudent()],
    loadChildren: () =>
      import('./dashboard-student/student.routes').then(
        (c) => c.student_routes
      ),
  },
];
