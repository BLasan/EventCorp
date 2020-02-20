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
  our_venue: any;
  outputResult: any;
  items: Array<any>;
  itemCount: any;

  constructor(
    private svc: VenueCalendarService,
    private db: AngularFirestore,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {

    //getting the venue name
    this.db.collection('register_user').doc(this.loginService.currentUser()).collection('venue').doc('hall').snapshotChanges()
      .subscribe(output => {
        this.outputResult = output.payload.data();
        this.our_venue = this.outputResult.nameToSearch;
        console.log("ddddddddddddddddddd", this.our_venue);

        //filtering out the events relavent to this profiles venue
        this.db.collection('events', ref => ref.where('accepted', '==', 1).where('nameToSearch', '==', this.our_venue)).valueChanges().pipe(
          tap(events => console.log("filtered - ", events)),
          map(events => events.map(event => {
            console.log("last ddddddddddddddddddd", this.our_venue);
            let data: any = event;
            data.start = data.event_start.toDate();
            data.end = data.event_end.toDate();
            data.end++;
            // data.end++;
            return data;
          }))
        ).subscribe(data => {
          this.calendarEvents = data;
        })

      })

  }

}
