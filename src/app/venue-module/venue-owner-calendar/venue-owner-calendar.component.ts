import { Component, OnInit, OnChanges } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { VenueCalendarService } from 'app/venue-calendar.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from 'app/services/login.services';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-venue-owner-calendar',
  templateUrl: './venue-owner-calendar.component.html',
  styleUrls: ['./venue-owner-calendar.component.scss']
})
export class VenueOwnerCalendarComponent implements OnInit {

  calendarEvents: any[] = [];
  calendarPlugins = [dayGridPlugin];
  public venue_name: any;
  count: any = 1;
  i: any;

  constructor(
    private svc: VenueCalendarService,
    private db: AngularFirestore,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getData().subscribe(data => this.calendarEvents = data);
  }

  getData(): Observable<any[]> {

    return this.db.collection('events', ref => ref.where('accepted', '==', 1).where('v_name', '==', 'nelum pokuna')).valueChanges().pipe(
      tap(events => console.log("filtered - ", events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
      map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
        let data: any = event;
        data.start = data.event_start.toDate();
        data.end = data.event_end.toDate();
        data.end++;
        // data.end++;
        return data;
        // let obj={title:data.event_name,start:new Date(data.date)}
        // return obj;

      }))
    );
  }

}
