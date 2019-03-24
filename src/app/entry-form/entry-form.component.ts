import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

import { Entry } from '../data/Entry';
import { EntryService } from '../entry.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  id: string;
  toUpdate: boolean;
  entry: Entry;
  entryRef: any;
  subEntry: any;
  subAuth: any;

  constructor(
    private es: EntryService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.entry = new Entry;
    this.id = this.route.snapshot.params['id'];
    this.toUpdate = this.id !== undefined;
    if (this.toUpdate) {
      // console.log("update");
      this.subEntry = this.es.getEntry(this.id).subscribe(
        entry => this.entry = entry,
        error => console.log(error)
      )
    } else {
      this.subAuth = this.auth.checkAuth().subscribe(
        logged => this.id = logged.uid,
        error => console.log(error)
      )
    }
  }

  onSubmit() {
    if (this.toUpdate) {
      
      if (this.entry.isDraft)
        this.entry.lastDraft = firebase.firestore.FieldValue.serverTimestamp();
      else this.entry.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();

      this.entryRef = this.es.updateEntry(this.entry, this.id)
        .then(_ => this.router.navigate(['entry-details', this.id]))
        .catch(error => console.log(error));

    } else {
      this.entry.userId = this.id;
      this.entry.isDraft = true;
      this.entry.lastDraft = firebase.firestore.FieldValue.serverTimestamp();
      this.entry.published = null;
      this.entry.lastUpdated = null;
      this.entryRef = this.es.createEntry(this.entry)
        .then(data => this.router.navigate(['entry-details', data.id]))
        .catch(error => console.log(error));
    }
  }

  goBack(): void {
    if (this.toUpdate) this.router.navigate(['/entry-details', this.id]);
    else this.router.navigate(['/entry-list']);
  }

  ngOnDestroy() {
    if (this.subEntry) this.subEntry.unsubscribe();
    if (this.subAuth) this.subAuth.unsubscribe();
  }

}
