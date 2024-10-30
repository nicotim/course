import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { UserRoles, User, UserRole } from '../models/interface/user.interface';
import { UserService } from './user.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _auth = inject(Auth);
  private readonly _firestore = inject(Firestore);
  private readonly _userService = inject(UserService);
  private readonly _angularFirestore = inject(AngularFirestore);

  async signUp(
    email: string,
    password: string,
    role: UserRole = UserRoles.USER
  ): Promise<void> {
    try {
      const credential = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      await this.createUserDocument(credential.user.uid, email, role);
    } catch (error) {
      console.error('Error during sign up:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const credential = await signInWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      if (credential.user) {
        const userId = credential.user.uid;
        const userDocRef = this._angularFirestore
          .collection<User>('users')
          .doc(userId);

        await userDocRef.update({
          lastLogin: new Date(),
        });

        const userDoc = await lastValueFrom(this._userService.getUser(userId));

        return userDoc;
      }
      return null;
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(this._auth, provider);
      await this.createUserDocument(
        credential.user.uid,
        credential.user.email!,
        UserRoles.USER
      );
    } catch (error) {
      console.error('Error during Google sign in:', error);
      throw error;
    }
  }

  async logOut(): Promise<void> {
    try {
      await signOut(this._auth);
    } catch (error) {
      console.error('Error during log out:', error);
      throw error;
    }
  }

  private async createUserDocument(
    uid: string,
    email: string,
    role: UserRole
  ): Promise<void> {
    const userDoc: User = {
      uid,
      displayName: 'New User',
      email,
      role,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    const userRef = doc(this._firestore, `users/${uid}`);
    await setDoc(userRef, userDoc);
  }
}
