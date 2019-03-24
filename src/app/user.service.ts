import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { User } from './data/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  createUser(user: User, id: string): Promise<void> {
    return this.db.collection<User>('users').doc(id).set({...user});
  }

  getUserList() {
    return this.db.collection<User>('users').snapshotChanges();
  }

  getUser(id: string): Observable<User> {
    return this.db.doc<User>(`users/${id}`).valueChanges();
  }

  updateLastLogin(id: string): Promise<void> {
    // console.log(`/users/${id}`);
    return this.db.doc<User>(`/users/${id}`).update({lastLogin: firebase.firestore.FieldValue.serverTimestamp()});
  }
}
