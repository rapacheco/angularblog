import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import * as firebase from 'firebase';

import { Entry } from './data/Entry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  
  constructor(private db : AngularFirestore) { }

  getEntryList() {
    return this.db.collection<Entry>('entries').snapshotChanges();
  }

  getEntry(id: string): Observable<Entry> {
    return this.db.doc<Entry>(`/entries/${id}`).valueChanges();
  }

  createEntry(entry: Entry): Promise<DocumentReference> {
    return this.db.collection<Entry>('entries').add({...entry});
  }

  updateEntry(entry: Entry, id: string): Promise<void> {
    return this.db.doc<Entry>(`/entries/${id}`).update(entry);
  }

  publishEntry(id: string): Promise<void> {
    return this.db.doc<Entry>(`/entries/${id}`).update({
      published: firebase.firestore.FieldValue.serverTimestamp(),
      isDraft: false
    });
  }

  deleteEntry(id: string): Promise<void> {
    return this.db.doc<Entry>(`/entries/${id}`).delete();
  }
}
