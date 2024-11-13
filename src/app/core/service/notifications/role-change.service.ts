import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RoleChangeService {
  private readonly _firestore = inject(Firestore);

  async requestRole(userUid: string, role: string) {
    const notificationsRef = collection(this._firestore, 'notifications');
    const notificationsData = {
      userUid,
      role,
      timestamp: new Date(),
      completed: false,
    };

    try {
      await addDoc(notificationsRef, notificationsData);
      console.log('Request has been sent');
    } catch {
      console.log('There was an error');
    }
  }
}
