import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly _auth = inject(Auth);

  // Se fija en el estado de mi auth
  authState$: Observable<any> = authState(this._auth);
  // Observable de la informacion de mi user

  get isLoggedIn$(): Observable<boolean> {
    return this.authState$.pipe(map((user) => !!user));
  }
}
