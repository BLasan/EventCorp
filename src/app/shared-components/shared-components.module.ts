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
} from '@angular/material';
import { OnlineChatModule } from 'app/Modules/online-chat/online-chat.module';

@NgModule({
  declarations: [
    NotificationsComponent,
    PaypalPaymentComponent,
    RatingSystemComponent,
    SearchUserComponent,
    SettingsComponent
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
    OnlineChatModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    OnlineChatModule
  ],
  exports:[
    SettingsComponent,
    PaypalPaymentComponent,
    RatingSystemComponent,
    SearchUserComponent,
    NotificationsComponent,
    PaypalPaymentComponent
  ]
})
export class SharedComponentsModule { }
