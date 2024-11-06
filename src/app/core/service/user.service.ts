import { inject, Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { User, UserRole } from '@core/models/interface/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {
  private readonly _aFireAuth = inject(AngularFireAuth);
  private readonly _angularFirestore = inject(AngularFirestore);
  private readonly _firestore = inject(Firestore);
  private readonly destroy$ = new Subject<void>();

  private cachedUserRole: UserRole | null = null;

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

  clearCache(): void {
    this.cachedUserRole = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
