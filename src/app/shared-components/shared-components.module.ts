import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaypalPaymentComponent } from 'app/Modules/paypal-payment/paypal-payment.component';
import { RatingSystemComponent } from './rating-system/rating-system.component';
import { SearchUserComponent } from 'app/Modules/search-user/search-user.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
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
  MatListItem,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatIcon,
  MatIconModule,
} from '@angular/material';
import { OnlineChatModule } from 'app/Modules/online-chat/online-chat.module';
import { MyChatsComponent } from './my-chats/my-chats.component';
import { ViewAllProductsComponent } from 'app/Modules/Supplier-Module/view-all-products/view-all-products.component';
import { SearchItemsPipe } from 'app/Modules/Supplier-Module/searchItems.pipe';
import { ViewAllEventsComponent } from 'app/Modules/Organizer-Module/view-all-events/view-all-events.component';
import { ViewUserEventsComponent } from 'app/shared-components/view-user-events/view-user-events.component';
import { BookedEventsComponent } from './booked-events/booked-events.component';
import { SearchBookedEventsPipe } from './searchBookedEvents.pipe';
import { UserLocationComponent } from './user-location/user-location.component';
//import { SearchArtistPipe } from 'app/Modules/Customer-Module/searchArtist.pipe';


@NgModule({
  declarations: [
    NotificationsComponent,
    PaypalPaymentComponent,
    SearchUserComponent,
    SettingsComponent,
    RatingSystemComponent,
    MyChatsComponent,
    ViewAllProductsComponent,
    SearchItemsPipe,
    ViewAllEventsComponent,
    BookedEventsComponent,
    SearchBookedEventsPipe,
    UserLocationComponent,
    //SearchArtistPipe,
    //ViewUserEventsComponent
  ],
  imports: [
    CommonModule,
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    OnlineChatModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  exports:[
    SettingsComponent,
    PaypalPaymentComponent,
    SearchUserComponent,
    NotificationsComponent,
    PaypalPaymentComponent,
    RatingSystemComponent,
    MyChatsComponent,
    ViewAllProductsComponent,
    SearchItemsPipe,
    ViewAllEventsComponent,
    BookedEventsComponent,
    UserLocationComponent,
  ]
})
export class SharedComponentsModule { }
