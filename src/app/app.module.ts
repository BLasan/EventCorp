import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { NgAlertModule } from '@theo4u/ng-alert';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormComponent } from './Modules/Admin-Module/form/form.component';
import { ArtistLayoutComponent } from './layouts/artist-layout/artist-layout.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { HomePageComponent } from './Modules/home-page/home-page.component';
import { CustomerNavbarComponent } from './customer-components/customer-navbar/customer-navbar.component';
import { CustomerNavbarModule } from './customer-components/customer-navbar/customer-navbar.module';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { LoginComponent } from './Login-SignUp/login/login.component';
import { SignupComponent } from './Login-SignUp/signup/signup.component';
import { LoginSignupModule } from './Login-SignUp/login-signup.module';
import { AuthGuardAdminService } from './services/Authentication/authGuard_admin.service';
import { AuthGuardArtistService } from './services/Authentication/authGuard_artist.service';
import { AuthGuardOrganizerService } from './services/Authentication/authGuard_organizer.service';
import { AuthGuardSupplierService } from './services/Authentication/athGuard_supplier.service';
import { AuthGuardVenueOwnerService } from './services/Authentication/authGuard_venueOwner.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OnlineChatComponent } from './Modules/online-chat/online-chat.component';
import { MatListItem, MatListModule, MatSnackBarModule, MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatSliderModule, MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSidenavModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatStepperModule } from '@angular/material';
import { ChatService } from './services/chat.service';
import { PaypalPaymentComponent } from './shared-components/paypal-payment/paypal-payment.component';
import { OnlineChatModule } from './Modules/online-chat/online-chat.module';
import { OrganizerNotificationsComponent } from './Modules/Organizer-Module/organizer-notifications/organizer-notifications.component';
import { OrganizerSettingsComponent } from './Modules/Organizer-Module/organizer-settings/organizer-settings.component';
import { OrganizerEventsComponent } from './Modules/Organizer-Module/organizer-events/organizer-events.component';
import { OrganizerProfileComponent } from './Modules/Organizer-Module/organizer-profile/organizer-profile.component';
import { OrganizerLayoutComponent } from './layouts/organizer-layout/organizer-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const config = {
  apiKey: "AIzaSyA95SG6_4tkcDHDySiuQfVt9cbm_kyUwhk",
  authDomain: "eventcorppro.firebaseapp.com",
  databaseURL: "https://eventcorppro.firebaseio.com",
  projectId: "eventcorppro",
  storageBucket: "eventcorppro.appspot.com",
  messagingSenderId: "886719532814",
  appId: "1:886719532814:web:9424058ace3d13af"
};
// import { VenueProfileComponent } from './venue-profile/venue-profile.component';
import { VenueCalendarComponent } from './venue-module/venue-calendar/venue-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material';
// import { VenueAddComponent } from './venue-module/venue-home/venue-add/venue-add.component';
// import { VenueListComponent } from './venue-module/venue-home/venue-list/venue-list.component';
// import { VenueHomeComponent } from './venue-module/venue-home/venue-home.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    NgAlertModule,
    ReactiveFormsModule,
    //HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FullCalendarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    SharedComponentsModule,
    CustomerNavbarModule,
    LoginSignupModule,

    // AngularFireModule.initializeApp(config),
    // AngularFirestoreModule, // firestore
    // AngularFireAuthModule, // auth
    // AngularFireStorageModule,// storage
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CustomerLayoutComponent,
    OrganizerLayoutComponent,
    VenueCalendarComponent,
    ArtistLayoutComponent,
    ErrorPageComponent,
    PaypalPaymentComponent

  ],

  providers: [AuthGuardAdminService,AuthGuardArtistService,AuthGuardOrganizerService,AuthGuardSupplierService,AuthGuardVenueOwnerService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
