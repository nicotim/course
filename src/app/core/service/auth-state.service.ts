import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly _auth = inject(Auth);

  authState$ = authState(this._auth);

  get isLoggedIn$(): Observable<boolean> {
    return this.authState$.pipe(map((user) => !!user));
  }
}
