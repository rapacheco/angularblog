import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  personal: boolean;

  subId: any;
  subUser: any;
  id: string;
  userName: string;

  constructor(
    private auth: AuthService,
    private us: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subUser = this.auth.checkAuth().subscribe(authUser => {
      if (authUser) {
        this.id = authUser.uid;
          this.us.getUser(authUser.uid).subscribe(user => 
            this.userName = user.userName
        );
      } else {
        this.userName = null;
      }
    });
  }

  goToForm() {
    this.router.navigate(['entry-form']);
  }

  switch() {
    this.personal = !this.personal;
  }

  ngOnDestroy() {
    if (this.subId) this.subId.unsubscribe();
    if (this.subUser) this.subUser.unsubscribe();
  }

}
