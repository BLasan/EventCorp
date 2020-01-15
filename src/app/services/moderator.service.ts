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

  getQueries(){
    return this.db.collection('queries').snapshotChanges();
  }

  getVenues(){
    return this.db.collection('Venues').snapshotChanges();
  }

  getArtists(){
    return this.db.collection('register_user',ref => ref.where('role', '==', 'artist')).snapshotChanges();
  }

  getOrganizers(){
    return this.db.collection('register_user',ref => ref.where('role', '==', 'organizer')).snapshotChanges();
  }

  getSuppliers(){
    return this.db.collection('register_user',ref => ref.where('role', '==', 'supplier')).snapshotChanges();
  }
}
