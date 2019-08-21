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

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatCalendar,
    
  } from '@angular/material';
import { PaypalPaymentComponent } from 'app/Modules/paypal-payment/paypal-payment.component';
import { ViewBookingInfoComponent } from 'app/Modules/Artist-Module/view-booking-info/view-booking-info.component';
 

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

    ],
    declarations: [
     ArtistComponent,
     ArtistCalendarComponent,
     ArtistNotificationComponent,
     ArtistRequestComponent,
     ArtistHomeComponent,
     CalendarComponent,
     PaypalPaymentComponent,
     ViewBookingInfoComponent
    ],
   
  })
  
  export class ArtistLayoutModule {}
  