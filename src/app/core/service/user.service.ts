import { inject, Injectable, OnDestroy } from '@angular/core';
import { User, UserRole } from '../models/interface/user.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {
  private readonly _aFireAuth = inject(AngularFireAuth);
  private readonly _angularFirestore = inject(AngularFirestore);
  private readonly _firestore = inject(Firestore);
  private readonly destroy$ = new Subject<void>();

  // Cache
  private cachedUser: User | null = null;
  private cachedUserRole: UserRole | null = null;

  // Devuelve los datos de un usuario, basado en su uid
  fetchUser$(uid: string): Observable<User | null> {
    console.log('getUser called with UID:', uid);
    if (this.cachedUser) {
      console.log('Using cached user data');
      return of(this.cachedUser);
    } else {
      return this._angularFirestore
        .doc<User>(`users/${uid}`)
        .valueChanges()
        .pipe(
          tap((user) => {
            console.log('Firestore returned user:', user);
            if (user) {
              this.cachedUser = user;
            }
          }),
          map((user) => user ?? null),
          takeUntil(this.destroy$)
        );
    }
  }

  // Devuelve un observable con el rol del usuario
  get fetchCurrentUserRole$(): Observable<UserRole | null> {
    if (this.cachedUserRole) {
      return of(this.cachedUserRole);
    } else {
      return this.fetchCurrentUser$.pipe(
        map((userData) => userData?.role || null)
      );
    }
  }

  // Devuelve los datos del usuario activo
  get fetchCurrentUser$(): Observable<User | null> {
    return this._aFireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._angularFirestore
            .collection<User>('users')
            .doc(user.uid)
            .valueChanges()
            .pipe(
              map((user) => user ?? null),
              shareReplay(1),
              takeUntil(this.destroy$)
            );
        } else {
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
