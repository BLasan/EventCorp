import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  reports: Observable<any[]>;
  constructor(private db: AngularFirestore) { }

  getReports(){
    return this.db.collection('reports').snapshotChanges();
  }
}
