import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { LoadingService, UserService } from '@core/service';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const user = inject(UserService);

    return user.authState$.pipe(
      map((state) => {
        if (!state) {
          router.navigateByUrl('/auth/login');
          return false;
        }
        return true;
      })
    );
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const user = inject(UserService);

    return user.authState$.pipe(
      map((state) => {
        if (state) {
          router.navigateByUrl('/home');
          return false;
        }
        return true;
      })
    );
  };
};
