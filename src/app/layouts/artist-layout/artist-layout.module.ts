import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistLayoutRoutes } from './artist-layout.routing';
import { ArtistComponent } from '../../Modules/Artist-Module/artist/artist.component';
import { ArtistCalendarComponent } from '../../Modules/Artist-Module/artist-calendar/artist-calendar.component';
import { ArtistNotificationComponent } from '../../Modules/Artist-Module/artist-notification/artist-notification.component';
import { ArtistRequestComponent } from '../../Modules/Artist-Module/artist-request/artist-request.component';
import { ArtistHomeComponent } from '../../Modules/Artist-Module/artist-home/artist-home.component';
import { CalendarComponent } from 'ng-fullcalendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from "angularx-flatpickr";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { FullCalendarModule } from "ng-fullcalendar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatGridListModule } from "@angular/material/grid-list";
import { VenueListComponent } from "../../venue-module/venue-home/venue-list/venue-list.component"
import { VenueProfileComponent } from "../../venue-profile/venue-profile.component";
import { VenueReservationFormComponent } from "../../venue-module/venue-reservation-form/venue-reservation-form.component";
import { VenueAddComponent } from "../../venue-module/venue-home/venue-add/venue-add.component";
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ViewBookingInfoComponent } from 'app/Modules/Artist-Module/view-booking-info/view-booking-info.component';
// import {MatTableDataSource} from '@angular/material/table';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatCardModule,
      MatListModule,
      MatChipsModule,
      // MatTableModule
} from "@angular/material";

 


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
      MatCardModule,
      MatListModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      NgbModule,
      NgxMatSelectSearchModule,
      SharedComponentsModule,
      MatTableModule,
      MatSortModule,
  MatDialogModule,
      // MatTableDataSource
    ],
    declarations: [
     ArtistComponent,
     ArtistNotificationComponent,
     ArtistRequestComponent,
     ArtistHomeComponent,
     CalendarComponent,
     ArtistCalendarComponent,
    //  PaypalPaymentComponent,
    ViewBookingInfoComponent,
    VenueListComponent,
    VenueProfileComponent,
    VenueReservationFormComponent,
    VenueAddComponent
    ],
    
     
    //  RatingSystemComponent,
  providers: [MatDatepickerModule]
})
export class ArtistLayoutModule {}