import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private modal: NgbModal
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

  onLogout() {
    this.auth.doLogout()
    .then(_ => {
      this.modal.dismissAll('Logout');
      this.router.navigate(['entry-list']);
    })
    .catch(err => console.log(err));
  }

}
