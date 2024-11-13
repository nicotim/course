import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { User, UserRole } from '@core/models/interface/user.interface';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {
  private readonly _auth = inject(Auth);
  private readonly _angularFirestore = inject(AngularFirestore);
  private readonly _firestore = inject(Firestore);
  private readonly destroy$ = new Subject<void>();

  user$: Observable<User | null>;
  private cachedUserRole$: Observable<UserRole | null>;

  constructor() {
    this.user$ = authState(this._auth).pipe(
      switchMap((authUser: User | null) => {
        if (authUser) {
          return this.getUser(authUser.uid);
        } else {
          return of(null);
        }
      })
    );
    this.cachedUserRole$ = this.user$.pipe(
      map((userData) => userData?.role || null),
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  private getUser(uid: string): Observable<User | null> {
    const userRef: AngularFirestoreDocument<User> = this._angularFirestore.doc(
      `users/${uid}`
    );
    return userRef.valueChanges({ idField: 'uid' }).pipe(
      take(1),
      map((user) => user ?? null)
    );
  }

  get authState$(): Observable<User | null> {
    return authState(this._auth);
  }

  get loginStatus$(): Observable<boolean> {
    return this.authState$.pipe(map((user) => !!user));
  }

  get fetchCurrentUserRole$(): Observable<UserRole | null> {
    if (this.cachedUserRole$) {
      return this.cachedUserRole$;
    } else {
      return of(null);
    }
  }

  async createUserDocument(
    uid: string,
    email: string,
    displayName: string,
    role: UserRole
  ): Promise<void> {
    const userRef = doc(this._firestore, `users/${uid}`);

    const userDoc: User = {
      uid,
      displayName,
      email,
      role,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    try {
      const userDocSnapshot = await getDoc(userRef);
      if (!userDocSnapshot.exists()) {
        await setDoc(userRef, userDoc);
        console.log('New user document created');
      } else {
        await updateDoc(userRef, {
          lastLogin: new Date(),
        });
        console.log('User document updated');
      }
    } catch (error) {
      console.error('Error creating/updating user document:', error);
    }
  }

  clearCache(): void {
    this.cachedUserRole$ = of(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
