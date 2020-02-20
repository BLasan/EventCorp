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

  calendarEvents: any[] = [];
  calendarPlugins = [dayGridPlugin];
  public venue_name: any;
  count: any = 1;
  i: any;

  constructor(private svc: VenueCalendarService,
    private db: AngularFirestore,
    private loginService: LoginService) { }

  ngOnInit() {
    this.db.collection('register_user').doc(this.loginService.currentUser())
      .get().subscribe(result => {
        this.venue_name = result.data().v_name;
        console.log("result - ", this.venue_name);
        this.getData().subscribe(data => this.calendarEvents = data);
      })

  }

  //getting data
  getData(): Observable<any[]> {

    return this.db.collection('events', ref => ref.where('accepted', '==', 1).where('v_name', '==', 'royal complex')).valueChanges().pipe(
      tap(events => console.log("filtered - ", events)), 
      map(events => events.map(event => { 
        let data: any = event;
        data.start = data.event_start.toDate();
        data.end = data.event_end.toDate();
        data.end++;
        return data;

      }))
    );
  }

}
