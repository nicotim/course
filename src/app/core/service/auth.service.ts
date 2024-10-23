import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { User } from '../models/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _auth = inject(Auth);

  signUp(user: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }

  signIn(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }

  signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider);
  }
}
