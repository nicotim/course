import { inject, Injectable } from '@angular/core';
import { User, UserRole } from '../models/interface/user.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs/internal/observable/of';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _aFireAuth = inject(AngularFireAuth);
  private readonly _angularFirestore = inject(AngularFirestore);
  private readonly _firestore = inject(Firestore);

  // Cache
  private cachedUser: User | null = null;
  private cachedUserRole: UserRole | null = null;

  // Devuelve los datos de un usuario, basado en su uid
  getUser(uid: string): Observable<User | null> {
    if (this.cachedUser) {
      return of(this.cachedUser);
    } else {
      return this._angularFirestore
        .doc<User>(`users/${uid}`)
        .valueChanges()
        .pipe(
          tap((user) => {
            if (user) {
              this.cachedUser = user;
            }
          }),
          map((user) => user ?? null)
        );
    }
  }

  // Devuelve un observable con el rol del usuario
  get currentUserRole$(): Observable<UserRole | null> {
    if (this.cachedUserRole) {
      return of(this.cachedUserRole);
    } else {
      return this.getCurrentUserData$.pipe(
        map((userData) => userData?.role || null)
      );
    }
  }

  // Devuelve los datos del usuario activo
  get getCurrentUserData$(): Observable<User | null> {
    return this._aFireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._angularFirestore
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

  // Crea el documento con la informacion del usuario cuando se crea uno nuevo
  async createUserDocument(
    uid: string,
    email: string,
    displayName: string,
    role: UserRole
  ): Promise<void> {
    const userDoc: User = {
      uid,
      displayName,
      email,
      role,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    const userRef = doc(this._firestore, `users/${uid}`);
    await setDoc(userRef, userDoc);
  }

  // Limpiar el cache
  clearCache(): void {
    this.cachedUser = null;
    this.cachedUserRole = null;
  }
}
