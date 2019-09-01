import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistLayoutRoutes } from './artist-layout.routing';
import { ArtistComponent } from 'app/Artist-Module/artist/artist.component';
import {ArtistCalendarComponent} from 'app/Artist-Module/artist-calendar/artist-calendar.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from 'ng-fullcalendar';
import {ArtistNotificationComponent} from 'app/Artist-Module/artist-notification/artist-notification.component'; 
import {ArtistRequestComponent} from 'app/Artist-Module/artist-request/artist-request.component';
import {ArtistHomeComponent} from 'app/Artist-Module/artist-home/artist-home.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';

// import {MatMomentDateModule } from '@angular/material-moment-adapter';
import { VenueProfileComponent } from '../../venue-profile/venue-profile.component';
import { VenueReservationFormComponent } from '../../venue-module/venue-reservation-form/venue-reservation-form.component';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatNativeDateModule
  } from '@angular/material';
 

  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(ArtistLayoutRoutes),
      FormsModule,
      MatButtonModule,
      MatRippleModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatTooltipModule,
      FullCalendarModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatGridListModule
    ],
    declarations: [
     ArtistComponent,
     ArtistCalendarComponent,
     ArtistNotificationComponent,
     ArtistRequestComponent,
     ArtistHomeComponent,
     VenueProfileComponent,
     VenueReservationFormComponent
    ],

    providers: [MatDatepickerModule],
   
  })
  
  export class ArtistLayoutModule {}
  