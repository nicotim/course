import { inject, Injectable } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {
  map,
  of,
  switchMap,
  Observable,
  BehaviorSubject,
  tap,
  catchError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly _auth = inject(Auth);
  private readonly _angularFirestore = inject(AngularFirestore);

  // Me da los datos del usuario, especificamente en este caso los que tengo en la database
  user$: Observable<User | null>;

  constructor() {
    this.user$ = authState(this._auth).pipe(
      switchMap((authUser: User | null) => {
        if (authUser) {
          return this.getUserFromFirestore(authUser.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  private getUserFromFirestore(uid: string): Observable<User | null> {
    const userRef: AngularFirestoreDocument<User> = this._angularFirestore.doc(
      `users/${uid}`
    );
    return userRef
      .valueChanges({ idField: 'uid' })
      .pipe(map((user) => user ?? null));
  }

  // Me devuelve null si no estoy logueado y si estoy logueado me da la info desde el lado del Auth
  get authState$(): Observable<User | null> {
    return authState(this._auth);
  }

  // Me devuelve un boolean dependiendo de si estoy logueado o no
  get isLoggedIn$(): Observable<boolean> {
    return this.authState$.pipe(map((user) => !!user));
  }
}
