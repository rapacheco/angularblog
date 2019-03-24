import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

import { User } from './data/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth
  ) {}  

  checkAuth(): Observable<any> {
    return this.fireAuth.authState;
  }

  doRegister(user: User, password: string, confirm: string) {
    return new Promise<any>((resolve, reject) => {
      if (!user.userName || !password || !user.email || !confirm)
        reject("All fields are mandatory");
      else if (password !== confirm) 
        reject("Password does not match");
      
      firebase.auth().createUserWithEmailAndPassword(user.email.toString(), password)
      .then(res =>
        resolve(res),
        err => reject(err.message))
    });
  }

  doLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      if (!email || !password)
        reject("All fields are mandatory");
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => resolve(res))
      .catch(err => reject(err));
    });
  }

  doLogout() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signOut()
      .then(res => {
        localStorage.setItem('user', null);
        resolve(res);
      })
      .catch(err => reject(err))
    });
  }

  isLoggedIn(): boolean { 
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
