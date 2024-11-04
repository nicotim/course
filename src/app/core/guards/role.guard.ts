import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRoles } from '@core/models/interface/user.interface';
import { UserService } from '@core/service/user.service';
import { toast } from 'ngx-sonner';
import { catchError, map, of, take } from 'rxjs';

export const roleGuardAdmin = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const userService = inject(UserService);

    return userService.fetchCurrentUserRole$.pipe(
      take(1),
      map((role) => {
        if (role === UserRoles.ADMIN) {
          return true;
        }

        router.navigateByUrl('/home');
        toast.error("You don't have permissions to access this page.");
        return false;
      }),
      catchError((error) => {
        console.error('Role guard error:', error);
        router.navigateByUrl('/home');
        return of(false);
      })
    );
  };
};

export const roleGuardTeacher = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const userService = inject(UserService);

    return userService.fetchCurrentUserRole$.pipe(
      take(1),
      map((role) => {
        if (role === UserRoles.TEACHER) {
          return true;
        }
        router.navigateByUrl('/home');
        toast.error("You don't have permissions to access this page.");
        return false;
      }),
      catchError((error) => {
        console.error('Role guard error:', error);
        router.navigateByUrl('/home');
        return of(false);
      })
    );
  };
};

export const roleGuardStudent = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const userService = inject(UserService);

    return userService.fetchCurrentUserRole$.pipe(
      take(1),
      map((role) => {
        if (role === UserRoles.STUDENT) {
          return true;
        }

        router.navigateByUrl('/home');
        toast.error("You don't have permissions to access this page.");
        return false;
      }),
      catchError((error) => {
        console.error('Role guard error:', error);
        router.navigateByUrl('/home');
        return of(false);
      })
    );
  };
};
