import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../service/auth-state.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state) => {
        console.log(state);
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
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
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
