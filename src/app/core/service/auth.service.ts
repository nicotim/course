import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { UserRoles, User, UserRole } from '../models/interface/user.interface';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _auth = inject(Auth);
  private readonly _userService = inject(UserService);
  private readonly _angularFirestore = inject(AngularFirestore);

  async createAccount(
    email: string,
    password: string,
    displayName: string,
    role: UserRole = UserRoles.USER
  ): Promise<void> {
    try {
      const credential = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      await this._userService.createUserDocument(
        credential.user.uid,
        email,
        displayName,
        role
      );
    } catch (error) {
      console.error('Error during sign up:', error);
      throw error;
    }
  }

  // Login de usuarios con email y contraseña
  async logIn(email: string, password: string): Promise<void> {
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
      }
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    }
  }

  // Use de google para la autenticacion
  async createAccountWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(this._auth, provider);
      const user = credential.user;
      if (user) {
        await this._userService.createUserDocument(
          user.uid,
          credential.user.email!,
          credential.user.displayName || 'New user',
          UserRoles.USER
        );
      } else {
        console.error('Error during Google sign in');
      }
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
}
