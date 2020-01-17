import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap,map } from 'rxjs/operators';
import { LoginService } from './services/login.services';

@Injectable({
  providedIn: 'root'
})
export class VenueCalendarService {

  constructor(
    private db:AngularFirestore,
    private loginService: LoginService
    ) { }
  getData():Observable<any[]>{
    
    return this.db.collection('register_user').doc(this.loginService.currentUser()).collection('MyEvents').valueChanges().pipe(
      tap(events=> console.log(events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
      map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
        let data:any=event;
        data.start = new Date();
        data.end = new Date();
        data.end++;
        return data;

      }))
    );
  }
}
