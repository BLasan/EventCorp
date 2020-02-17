import { Component, OnInit, OnChanges } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { VenueCalendarService } from 'app/venue-calendar.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from 'app/services/login.services';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';


@Component({
  selector: 'app-venue-calendar',
  templateUrl: './venue-calendar.component.html',
  styleUrls: ['./venue-calendar.component.scss']
})
export class VenueCalendarComponent implements OnInit {

  calendarEvents:any[]=[];
  calendarPlugins=[dayGridPlugin];
  public venue_name:any;
  count:any = 1;
  i:any;

  constructor(private svc:VenueCalendarService,
    private db:AngularFirestore,
    private loginService:LoginService) { }

    // ngOnChanges(){
    //   // this.getData().subscribe(data=> this.calendarEvents=data);

    //   this.getData1();
    // }

  ngOnInit() {
    this.db.collection('register_user').doc(this.loginService.currentUser())
    .get().subscribe(result => {
      this.venue_name = result.data().v_name;
      console.log("result - ",this.venue_name);
      this.getData().subscribe(data=> this.calendarEvents=data);
    })
    // this.getData().subscribe(data=> this.calendarEvents=data);
    // this.getData1();


    // for(this.i = 0; this.i < 2; this.i++){
    //   if(this.count == 1){
    //     this.getData1();
    //     this.count++;
    //   }
    //   else if(this.count == 2){
    //     this.getData().subscribe(data=> this.calendarEvents=data);
    //   }
    // }
    
    // this.getData1();
    // this.getData1();

  }

  // getData1(){
  //   this.db.collection('register_user').doc(this.loginService.currentUser())
  //   .get().subscribe(result => {
  //     this.venue_name = result.data().v_name;
  //     // this.venue_name = result.payload.doc.data().v_name;
  //     console.log("result - ",this.venue_name);
  //     return this.venue_name;
  //   })
  // }
getData():Observable<any[]>{
  
  return this.db.collection('events',ref => ref.where('accepted','==',1).where('v_name','==','nelum pokuna')).valueChanges().pipe(
    tap(events=> console.log("filtered - ",events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
    map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
      let data:any=event;
      data.start = data.event_start.toDate();
      data.end = data.event_end.toDate();
      data.end++;
      // data.end++;
      return data;
      // let obj={title:data.event_name,start:new Date(data.date)}
      // return obj;

    }))
  );
  // return this.db.collection('register_user').doc(this.loginService.currentUser()).collection('MyEvents').valueChanges().pipe(
  //   tap(events=> console.log(events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
  //   map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
  //     let data:any=event;
  //     data.start = data.event_start.toDate();
  //     data.end = data.event_end.toDate();
  //     // data.end++;
  //     return data;
  //     // let obj={title:data.event_name,start:new Date(data.date)}
  //     // return obj;

  //   }))
  // );
}

  // getData1(){
  //   return this.db.collection('register_user').doc(this.loginService.currentUser())
  //   .get().subscribe(result => {
  //     this.venue_name = result.data().v_name;
  //     // this.venue_name = result.payload.doc.data().v_name;
  //     console.log("result - ",this.venue_name);
  //   })
  // }

}
