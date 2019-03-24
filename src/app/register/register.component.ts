import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../data/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() darkMode: boolean = false;

  user: User;
  password: string;
  confirm: string;
  error: string;

  constructor(
    private auth: AuthService,
    private us: UserService,
    private router: Router,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.user = new User;
  }

  open(content: any): void {
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
      this.router.navigate(['entry-list'])
    });
  }

  tryRegister() {
    this.auth.doRegister(this.user, this.password, this.confirm)
    .then(res => {
      this.user.registered = firebase.firestore.FieldValue.serverTimestamp();
      this.user.lastLogin = firebase.firestore.FieldValue.serverTimestamp();
      this.us.createUser(this.user, res.user.uid)
      .then(_ => {
        this.auth.doLogin(this.user.email.toString(), this.password)
        .then(_ => {
          this.modal.dismissAll('Register');
          this.router.navigate(['entry-list']);
        })
        .catch(err => this.error = err);
        })
        .catch(err => this.error = err);
    })
    .catch(err => {
      this.error = err;
      console.log(err);
      this.clear();
    })
  }

  clear() {
    this.user = new User;
    this.confirm = "";
    this.password = "";
  }

}
