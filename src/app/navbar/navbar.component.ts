import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: string;
  subUser: any;
  subAuth: any;
  isCollapsed: boolean = true;

  constructor(
    private auth: AuthService,
    private us: UserService
  ) { }

  ngOnInit() {
    
    this.subAuth = this.auth.checkAuth().subscribe(authUser => {
      if (authUser) {
          this.subUser = this.us.getUser(authUser.uid).subscribe(user => 
            this.userName = user.userName
        );
      } else {
        this.userName = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.subUser) this.subUser.unsubscribe();
    if (this.subAuth) this.subAuth.unsubscribe();
  }

}