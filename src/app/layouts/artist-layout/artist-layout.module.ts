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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
  } from '@angular/material';
import { PaypalPaymentComponent } from 'app/Modules/paypal-payment/paypal-payment.component';
import { ViewBookingInfoComponent } from 'app/Modules/Artist-Module/view-booking-info/view-booking-info.component';
import { RatingSystemComponent } from 'app/shared-components/rating-system/rating-system.component';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { ArtistSettingsComponent } from 'app/Modules/Artist-Module/artist-settings/artist-settings.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AddPlaylistComponent } from 'app/Modules/Artist-Module/add-playlist/add-playlist.component';
import { EditPlaylistComponent } from 'app/Modules/Artist-Module/edit-playlist/edit-playlist.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';

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
      MatSliderModule,
      NgbModule,
      MatAutocompleteModule,
      MatButtonToggleModule,
      MatCheckboxModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatMenuModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatSidenavModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatStepperModule,
      MatListModule,
      NgxMatSelectSearchModule,
      SharedComponentsModule,
      MatCarouselModule,
    ],
    declarations: [
     ArtistComponent,
     ArtistNotificationComponent,
     ArtistRequestComponent,
     ArtistHomeComponent,
     CalendarComponent,
     ArtistCalendarComponent,
     ArtistSettingsComponent,
     ViewBookingInfoComponent,
     AddPlaylistComponent,
     EditPlaylistComponent,
    //  BookedEventsComponent,
    //  SearchBookedEventsPipe
    ],
   
  })
  
  export class ArtistLayoutModule {}
  
