import { inject, Injectable } from '@angular/core';
import { User } from '../models/interface/user.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs/internal/observable/of';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _afFire = inject(AngularFireAuth);
  private readonly _firestore = inject(AngularFirestore);

  getUser(uid: string): Observable<User | null> {
    return this._firestore
      .doc<User>(`users/${uid}`)
      .valueChanges()
      .pipe(map((user) => user ?? null));
  }
  getCurrentUserData(): Observable<User | null> {
    return this._afFire.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._firestore
            .collection<User>('users')
            .doc(user.uid)
            .valueChanges()
            .pipe(map((user) => user ?? null));
        } else {
          return of(null);
        }
      })
    );
  }
}
