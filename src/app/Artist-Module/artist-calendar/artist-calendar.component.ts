 import { Component, OnInit } from '@angular/core';
 import {calendar} from '../../../scripts/artist/artist_calendar.js';
// import { startOfDay, endOfDay } from 'date-fns';
// import { OptionsInput } from '@fullcalendar/core';
// import interactionPlugin from '@fullcalendar/interaction';
// import { CalendarComponent } from 'ng-fullcalendar';

// import {
//   ChangeDetectionStrategy,
//   ViewChild,
//   TemplateRef
// } from '@angular/core';
// import {
//   subDays,
//   addDays,
//   endOfMonth,
//   isSameDay,
//   isSameMonth,
//   addHours
// } from 'date-fns';
// import { Subject } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {
//   CalendarEvent,
//   CalendarEventAction,
//   CalendarEventTimesChangedEvent,
//   CalendarView
// } from 'angular-calendar';

// //new imports

// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
//  declare function  calendar():any;

@Component({
  selector: 'app-artist-calendar',
  templateUrl: './artist-calendar.component.html',
  styleUrls: ['./artist-calendar.component.scss']
})
export class ArtistCalendarComponent implements OnInit {

  ngOnInit() {

    calendar();

      // var calendarEl = document.getElementById('calendar');
    
      // var calendar = new Calendar(calendarEl, {
      //   plugins: [ dayGridPlugin, timeGridPlugin, listPlugin  ]
      // });
    
      // calendar.render();

    
  }

  

}
 

  

