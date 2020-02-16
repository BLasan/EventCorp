import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    MatSliderModule,
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
  } from '@angular/material';
import { OrganizerLayoutRoutes } from './organizer.routing';
import { OrganizerHomeComponent } from '../../Modules/Organizer-Module/organizer-home/organizer-home.component';
import { OrganizerSettingsComponent } from 'app/Modules/Organizer-Module/organizer-settings/organizer-settings.component';
import { OrganizerNotificationsComponent } from 'app/Modules/Organizer-Module/organizer-notifications/organizer-notifications.component';
import { OrganizerProfileComponent } from 'app/Modules/Organizer-Module/organizer-profile/organizer-profile.component';
import { OrganizerEventsComponent } from 'app/Modules/Organizer-Module/organizer-events/organizer-events.component';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { FilterUsersPipe } from 'app/services/filter_users.pipe';
import { Component } from '@fullcalendar/core';
import { ComponentsModule } from 'app/components/components.module';
import { RatingSystemComponent } from 'app/shared-components/rating-system/rating-system.component';
import { OnlineChatComponent } from 'app/Modules/online-chat/online-chat.component';
import { OnlineChatModule } from 'app/Modules/online-chat/online-chat.module';
import { PaymentBillComponent } from 'app/Modules/Organizer-Module/payment-bill/payment-bill.component';
import { ViewAllProductsComponent } from 'app/Modules/Supplier-Module/view-all-products/view-all-products.component';
import { SearchItemsPipe } from 'app/Modules/Supplier-Module/searchItems.pipe';
import { ViewRequestStatusComponent } from 'app/Modules/Organizer-Module/view-request-status/view-request-status.component';
import { PaypalPaymentComponent } from 'app/shared-components/paypal-payment/paypal-payment.component';
import { PaymentUsersComponent } from 'app/Modules/Organizer-Module/payment-users/payment-users.component';
import { UpdateEventsComponent } from 'app/Modules/Organizer-Module/update-events/update-events.component';
import { ViewAllEventsComponent } from 'app/Modules/Organizer-Module/view-all-events/view-all-events.component';
import { SearchBillsPipe } from 'app/Modules/Organizer-Module/searchBills.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BookedEventsComponent } from 'app/shared-components/booked-events/booked-events.component';
import { SearchBookedEventsPipe } from 'app/shared-components/searchBookedEvents.pipe';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ViewUserEventsComponent } from 'app/shared-components/view-user-events/view-user-events.component';
  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(OrganizerLayoutRoutes),
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
      FullCalendarModule,
      MatCarouselModule
    ],
    declarations: [
      OrganizerHomeComponent,
      OrganizerSettingsComponent,
      OrganizerNotificationsComponent,
      OrganizerProfileComponent,
      OrganizerEventsComponent,
      FilterUsersPipe,
      PaymentBillComponent,
      ViewRequestStatusComponent,
      UpdateEventsComponent,
      SearchBillsPipe,
      // ViewUserEventsComponent
      // BookedEventsComponent,
      // SearchBookedEventsPipe
      // PaypalPaymentComponent,
      // PaymentUsersComponent
      // RatingSystemComponent
    ],
   
  })
export class OrganizerLayoutModule { }
