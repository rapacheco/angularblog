import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../data/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  email: string;
  password: string;
  error: string;
  logged: boolean = false;

  constructor(
    private auth: AuthService,
    private modal: NgbModal,
    private us: UserService
  ) { }

  ngOnInit() {
  }

  open(content) {
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }


  tryLogin() {
    this.auth.doLogin(this.email, this.password)
    .then(data => {
      this.us.updateLastLogin(data.user.uid)
      .then(_ => this.modal.dismissAll('Login'))
      .catch(err => this.error = `* ${err}`);
    })
    .catch(err => this.error = `* ${err}`);
  }

}
