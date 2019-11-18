import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { VenueCalendarService } from 'app/venue-calendar.service';


@Component({
  selector: 'app-venue-calendar',
  templateUrl: './venue-calendar.component.html',
  styleUrls: ['./venue-calendar.component.scss']
})
export class VenueCalendarComponent implements OnInit {

  calendarEvents:any[]=[];
  calendarPlugins=[dayGridPlugin];

  constructor(private svc:VenueCalendarService) { }

  ngOnInit() {
    this.svc.getData().subscribe(data=> this.calendarEvents=data);

  }

}
