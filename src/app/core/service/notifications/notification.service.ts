import { inject, Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _firestore = inject(Firestore);

  listenForRoleChangeRequests(callback: (notifications: any[]) => void): void {
    const notificationsRef = collection(this._firestore, 'notifications');
    const q = query(notificationsRef, where('completed', '==', false));

    onSnapshot(q, (querySnapshot) => {
      const notifications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(notifications);
    });
  }
}
