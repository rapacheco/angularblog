import { Timestamp } from '@angular/fire/firebase-node';

export class User {
    id: string;
    userName: string;
    email: String;
    lastLogin: Timestamp;
    registered: Timestamp;
}