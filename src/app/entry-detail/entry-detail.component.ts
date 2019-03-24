import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firebase-node';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { EntryService } from '../entry.service';
import { Entry } from '../data/Entry';
import { User } from '../data/User';

import * as moment from 'moment';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit {

  subAuth: any;
  user: User;
  subUser: any;
  entry: Entry;
  subEntry: any;
  entryRef: any;
  loggedId: string;
  id: string;

  constructor(
    private us: UserService,
    private es: EntryService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.entry = new Entry;
    this.user = new User;
    this.id = this.route.snapshot.params['id'];
    this.subEntry = this.es.getEntry(this.id).subscribe(
      entry => {
        this.entry = entry;
        this.subUser = this.us.getUser(entry.userId).subscribe(
          user => this.user = user,
          err => console.log(err)
        );
      }, err => console.log(err)
    );
    this.subAuth = this.auth.checkAuth().subscribe(
      user => this.loggedId = user.uid,
      err => console.log(err)
    );
  }

  open(content) {
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  formatDate(date: Timestamp): string {
    return date ? moment(date.toDate()).format('LL') : "";
  }

  publishEntry() {
    this.es.publishEntry(this.id)
    .then(_ => this.modal.dismissAll('Publish'))
    .catch(err => console.log(err));
  }

  updateEntry(id: string) {
    this.router.navigate(['entry-form', id])
  }

  deleteEntry() {
    if (this.subEntry) this.subEntry.unsubscribe();
    this.entryRef = this.es.deleteEntry(this.id)
    .then(_ => {
      this.modal.dismissAll('Delete');
      this.router.navigate(['entry-list']);
    })
    .catch(error => console.log(error));
  }

  ngOnDestroy() {
    if (this.subEntry) this.subEntry.unsubscribe();
    if (this.subUser) this.subUser.unsubscribe();
    if (this.subAuth) this.subAuth.unsubscribe();
  }

}
