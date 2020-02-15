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

  venue_name : any;

  constructor(
    private db:AngularFirestore,
    private loginService: LoginService
    ) { }

  //   getData1(){
  //     return this.db.collection('register_user').doc(this.loginService.currentUser())
  //     .get().subscribe(result => {
  //       this.venue_name = result.data().v_name;
  //       // this.venue_name = result.payload.doc.data().v_name;
  //       console.log("result - ",this.venue_name);
  //     })
  //   }
  // getData():Observable<any[]>{
    
  //   return this.db.collection('events',ref => ref.where('accepted','==',1).where('venue_name','==','royal')).valueChanges().pipe(
  //     tap(events=> console.log("filtered - ",events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
  //     map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
  //       let data:any=event;
  //       data.start = data.event_start.toDate();
  //       data.end = data.event_end.toDate();
  //       // data.end++;
  //       return data;
  //       // let obj={title:data.event_name,start:new Date(data.date)}
  //       // return obj;

  //     }))
  //   );
  //   // return this.db.collection('register_user').doc(this.loginService.currentUser()).collection('MyEvents').valueChanges().pipe(
  //   //   tap(events=> console.log(events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
  //   //   map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
  //   //     let data:any=event;
  //   //     data.start = data.event_start.toDate();
  //   //     data.end = data.event_end.toDate();
  //   //     // data.end++;
  //   //     return data;
  //   //     // let obj={title:data.event_name,start:new Date(data.date)}
  //   //     // return obj;

  //   //   }))
  //   // );
  // }
}
