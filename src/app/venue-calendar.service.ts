import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VenueCalendarService {

  constructor(private db:AngularFirestore) { }
  getData():Observable<any[]>{
    
    return this.db.collection('events').valueChanges().pipe(
      tap(events=> console.log(events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
      map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
        let data:any=event;
        data.start = data.start.toDate();
        return data;

      }))
    );
  }
}
