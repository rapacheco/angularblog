import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firebase-node';

import * as moment from 'moment';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { EntryService } from '../entry.service';
import { Entry } from '../data/Entry';
import { User } from '../data/User';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  @Input() personal: boolean;
  @Input() currentId: string;

  users: User[];
  subUsers: any;
  entries: Entry[];
  storage: Entry[];
  subEntries: any;

  constructor(
    private es: EntryService,
    private router: Router,
    private auth: AuthService,
    private us: UserService
  ) { }

  ngOnChanges() {
    if (!this.personal) {
      this.entries = this.storage ? [...this.storage.filter(e => !e.isDraft)] : [];
    } else {
      this.entries = this.storage ? [...this.storage.filter(e => e.userId === this.currentId)] : [];
    }
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllEntries();
  }

  getNonDraftEntries() {
    this.subEntries = this.es.getEntryList().subscribe(
      data => {
        this.entries = data.filter(e => 
          !e.payload.doc.data().isDraft
        ).map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Entry;
        });
      },
      error => console.log(error)
    );
  }

  getAllEntries() {
    this.subEntries = this.es.getEntryList().subscribe(
      data => {
        this.storage = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Entry;
        });
        this.entries = [...this.storage.filter(e => !e.isDraft)];
      },
      error => console.log(error)
    );
  }

  getAllUsers() {
    this.subUsers = this.us.getUserList().subscribe(
      data => this.users = data.map(e =>{
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      }),
      error => console.log(error)
    )
  }

  getUserName(id: string): string {
    return this.users ? this.users.filter(user => user.id === id)[0].userName : "";
  }

  goToDetail(id: string) {
    this.router.navigate(['entry-details', id]);
  }

  ngOnDestroy() {
    this.subEntries.unsubscribe();
    this.subUsers.unsubscribe();
  }

  formatDate(date: Timestamp): string {
    return moment(date.toDate()).format('ll');
  }

}
