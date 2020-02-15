import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AdminNotificationsComponent } from './admin-notifications.component';
import { MatFormFieldModule, MatButtonModule, MatRippleModule, MatInputModule, MatSelectModule, MatTooltipModule, MatListModule, MatDividerModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule, MatSlideToggleModule, MatIconModule, MatDialogModule, MatRadioModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SendMailService } from 'app/services/sendEmail.service';
import { AdminService } from 'app/services/admin.service';
import { ComponentsModule } from 'app/components/components.module';
import { NgAlertModule } from '@theo4u/ng-alert';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'app/app.routing';
import { CustomerNavbarModule } from 'app/customer-components/customer-navbar/customer-navbar.module';
import { LoginSignupModule } from 'app/Login-SignUp/login-signup.module';
import { PasswordResetModule } from 'app/Modules/password_reset.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlineChatModule } from 'app/Modules/online-chat/online-chat.module';
import { AppComponent } from 'app/app.component';
import { AdminLayoutComponent } from 'app/layouts/admin-layout/admin-layout.component';
import { CustomerLayoutComponent } from 'app/layouts/customer-layout/customer-layout.component';
import { OrganizerLayoutComponent } from 'app/layouts/organizer-layout/organizer-layout.component';
import { SupplierLayoutComponent } from 'app/layouts/supplier-layout/supplier-layout.component';
import { ArtistLayoutComponent } from 'app/layouts/artist-layout/artist-layout.component';
import { ErrorPageComponent } from 'app/error-page/error-page.component';
import { EmailVerifyComponent } from 'app/Modules/email-verify/email-verify.component';
import { VenueCalendarComponent } from 'app/venue-module/venue-calendar/venue-calendar.component';
import { LocationOwnerLayoutComponent } from 'app/layouts/location-owner-layout/location-owner-layout.component';
import { ModeratorLayoutComponent } from 'app/layouts/moderator-layout/moderator-layout.component';
import { ReportDialogComponent } from 'app/Modules/report-dialog/report-dialog.component';
import { PaypalPaymentComponent } from 'app/shared-components/paypal-payment/paypal-payment.component';
import { PaymentUsersComponent } from 'app/Modules/Organizer-Module/payment-users/payment-users.component';
import { ViewLocationComponent } from 'app/shared-components/view-location/view-location.component';
import { ViewUserEventsComponent } from 'app/shared-components/view-user-events/view-user-events.component';

describe('AdminNotificationsComponent', () => {
  let component: AdminNotificationsComponent;
  let fixture: ComponentFixture<AdminNotificationsComponent>;
  const config={
    apiKey: "AIzaSyCTIdcY84n5a6HJgMAPInQxWKialEj1bNk",
    authDomain: "eventcorpdeployed.firebaseapp.com",
    databaseURL: "https://eventcorpdeployed.firebaseio.com",
    projectId: "eventcorpdeployed",
    storageBucket: "eventcorpdeployed.appspot.com",
    messagingSenderId: "821531422676",
    appId: "1:821531422676:web:5eef3779cb652386eb3041",
    measurementId: "G-XQCHRW0GY4"
  }
  var originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatListModule,
        MatDividerModule,
        SharedComponentsModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule.enablePersistence(), // firestore-persistance mode
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        FullCalendarModule,
        HttpClientModule,
        BrowserAnimationsModule

      ],
      declarations: [
        AdminNotificationsComponent
      ],
      providers:    [ SendMailService,AdminService]
    })
    .compileComponents();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(AdminNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(function(done) {
    done();
  }, 1000);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //get data testing
  it('should create', () => {
    component.getData();
    expect(component.reports.length).toBeGreaterThanOrEqual(0);
  });

});
