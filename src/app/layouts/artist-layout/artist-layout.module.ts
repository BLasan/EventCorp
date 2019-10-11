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
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
  } from '@angular/material';
import { PaypalPaymentComponent } from 'app/Modules/paypal-payment/paypal-payment.component';
import { ViewBookingInfoComponent } from 'app/Modules/Artist-Module/view-booking-info/view-booking-info.component';
import { RatingSystemComponent } from 'app/Modules/rating-system/rating-system.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SearchFilterPipe } from 'app/components/navbar/search-filter.pipe';
import { NotificationsComponent } from 'app/shared-components/notifications/notifications.component';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { MyChatsComponent } from 'app/shared-components/my-chats/my-chats.component';
import { ArtistSettingsComponent } from 'app/Modules/Artist-Module/artist-settings/artist-settings.component';


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
      MatIconModule,
      NgbModule,
      NgxMatSelectSearchModule,
      SharedComponentsModule,
    ],
    declarations: [
     ArtistComponent,
     ArtistNotificationComponent,
     ArtistRequestComponent,
     ArtistHomeComponent,
     CalendarComponent,
     ArtistCalendarComponent,
     MyChatsComponent,
     ArtistSettingsComponent,
    //  PaypalPaymentComponent,
     ViewBookingInfoComponent,
    //  RatingSystemComponent,
    ],
   
  })
  
  export class ArtistLayoutModule {}
  