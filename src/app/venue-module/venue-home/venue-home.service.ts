import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VenueHomeService {

  private venuesCollection: AngularFirestoreCollection<any>;
  venues: Observable<any[]>;
  constructor(private db: AngularFirestore) {

    // this.venuesCollection = afs.collection<any>('Venues');
    // this.venues = this.db.collectionGroup('venue').snapshotChanges().pipe(map(
    //   actions => actions.map(a => {
    //     const data = a.payload.doc.data() as any;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   })
    // ));

   }

   myForm = new FormGroup({
    Name: new FormControl(''),
    ac: new FormControl(''),
    car_parking: new FormControl(''),
    fee: new FormControl(''),
    seating_capacity: new FormControl('')
  });

  getUsers(){
    return this.db.collection('Venues').snapshotChanges();
  }

  getUser(userKey){
    return this.db.collection('Venues').doc(userKey).snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('Venues',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('Venues',ref => ref.orderBy('seating_capacity').startAt(value)).snapshotChanges();
  }



  // getOrders() {
  //   return this.venues;
  // }
}
