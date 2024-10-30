import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly _afAuth = inject(AngularFireAuth);
  private readonly _auth = inject(Auth);

  get authState$(): Observable<any> {
    return authState(this._auth);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._afAuth.authState.pipe(map((user) => !!user));
  }
}
