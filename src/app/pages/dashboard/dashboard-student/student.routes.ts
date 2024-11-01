import { Routes } from '@angular/router';

export const student_routes: Routes = [
  {
    path: 'catalog',
    loadComponent: () =>
      import('./course-catalog/course-catalog.component').then(
        (c) => c.CourseCatalogComponent
      ),
  },
  {
    path: 'interface',
    loadComponent: () =>
      import('./learning-interface/learning-interface.component').then(
        (c) => c.LearningInterfaceComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./dashboard-student.component').then(
        (c) => c.DashboardStudentComponent
      ),
  },
];
