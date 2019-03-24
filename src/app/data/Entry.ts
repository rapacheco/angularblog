import { Timestamp } from '@angular/fire/firebase-node';

export class Entry {
    id: string;
    userId: string;
    title: String;
    subtitle: String;
    body: String;
    isDraft: boolean;
    lastDraft: Timestamp;
    published: Timestamp;
    lastUpdated: Timestamp;
}