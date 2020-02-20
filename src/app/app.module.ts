
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
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
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
import { ArtistSettingsComponent } from './Modules/Artist-Module/artist-settings/artist-settings.component';
import { EmailVerifyComponent } from './Modules/email-verify/email-verify.component';
import { SupplierLayoutComponent } from './layouts/supplier-layout/supplier-layout.component';
import { AddNewModeratorsComponent } from './Modules/Admin-Module/add-new-moderators/add-new-moderators.component';
import { SettingsComponent } from './shared-components/settings/settings.component';
import { RatingSystemComponent } from './shared-components/rating-system/rating-system.component';
import { ResetPasswordComponent } from './Modules/reset-password/reset-password.component';
import { ResetPasswordFirebaseComponent } from './Modules/reset-password-firebase/reset-password-firebase.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MyChatsComponent } from './shared-components/my-chats/my-chats.component';
import { AboutUsComponent } from './Modules/Customer-Module/about-us/about-us.component';
import { ContactUsComponent } from './Modules/Customer-Module/contact-us/contact-us.component';
import { FaqComponent } from './Modules/Customer-Module/faq/faq.component';
import { AuthGuardCustomerService } from './services/Authentication/authGuard_customer.service';
import { FeedbackComponent } from './Modules/Customer-Module/feedback/feedback.component';
import { LocationOwnerLayoutComponent } from './layouts/location-owner-layout/location-owner-layout.component'
import { VenueProfileResolver } from "./venue-profile/venue-profile.resolver";
import { VenueHomeService } from './venue-module/venue-home/venue-home.service'
import {enableProdMode} from '@angular/core';
import { CookieService } from "angular2-cookie/services/cookies.service";
// const config = {
//   apiKey: "AIzaSyA95SG6_4tkcDHDySiuQfVt9cbm_kyUwhk",
//   authDomain: "eventcorppro.firebaseapp.com",
//   databaseURL: "https://eventcorppro.firebaseio.com",
//   projectId: "eventcorppro",
//   storageBucket: "eventcorppro.appspot.com",
//   messagingSenderId: "886719532814",
//   appId: "1:886719532814:web:9424058ace3d13af"
// };

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

// import { VenueProfileComponent } from './venue-profile/venue-profile.component';
import { VenueCalendarComponent } from './venue-module/venue-calendar/venue-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { environment } from '../environments/environment';
import { AddPlaylistComponent } from './Modules/Artist-Module/add-playlist/add-playlist.component';
import { HelpComponent } from './shared-components/help/help.component';
import { PaymentBillComponent } from './Modules/Organizer-Module/payment-bill/payment-bill.component';
import { ModeratorNotificationsComponent } from './Modules/Moderator-Module/moderator-notifications/moderator-notifications.component';
import { ModeratorDashboardComponent } from './Modules/Moderator-Module/moderator-dashboard/moderator-dashboard.component';
import { ModeratorSettingsComponent } from './Modules/Moderator-Module/moderator-settings/moderator-settings.component';
import { ReportWarningsComponent } from './Modules/Moderator-Module/report-warnings/report-warnings.component';
import { ModeratorLayoutComponent } from './layouts/moderator-layout/moderator-layout.component';
import { AuthGuardModeratorService } from './services/Authentication/authGuard_moderator.service';
import { LatestEventsComponent } from './Modules/Customer-Module/latest-events/latest-events.component';
import { ReportDialogComponent } from './Modules/report-dialog/report-dialog.component';
import { FilterPipe } from './Modules/Moderator-Module/filter.pipe';
import { ViewAllProductsComponent } from './Modules/Supplier-Module/view-all-products/view-all-products.component';
import { SearchItemsPipe } from './Modules/Supplier-Module/searchItems.pipe';
import { ViewRequestStatusComponent } from './Modules/Organizer-Module/view-request-status/view-request-status.component';
import { PaymentUsersComponent } from './Modules/Organizer-Module/payment-users/payment-users.component';
import { AuthGuardPaymentService } from './services/Authentication/authGuard_payment.service';
import { ViewLocationComponent } from './shared-components/view-location/view-location.component';
import { AuthGuardLocationService } from './services/Authentication/authGuardLocation.service';
import { ShowProvidersComponent } from './Modules/Customer-Module/show-providers/show-providers.component';
import { AgmCoreModule } from '@agm/core';
//import { ViewUserEventsComponent } from './shared-components/view-user-events/view-user-events.component';
import { PasswordResetModule } from './Modules/password_reset.module';
import { AuthGuardResetPasswordService } from './services/Authentication/authGuard_reset_password.service';
import { AuthGuardViewLocationService } from './services/Authentication/authGuard_view_location.service';
import { ViewUserEventsComponent } from './shared-components/view-user-events/view-user-events.component';
import { AuthGuardViewUserEventsService } from './services/Authentication/authGuardViewUserEvents.service';
import { ViewBillComponent } from './Modules/Organizer-Module/view-bill/view-bill.component';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material';
// import { VenueAddComponent } from './venue-module/venue-home/venue-add/venue-add.component';
// import { VenueListComponent } from './venue-module/venue-home/venue-list/venue-list.component';
// import { VenueHomeComponent } from './venue-module/venue-home/venue-home.component';
//enableProdMode()
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
    CustomerNavbarModule,
    LoginSignupModule,
    PasswordResetModule,
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
    OnlineChatModule,
    MatSlideToggleModule,
    MatIconModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(), // firestore-persistance mode
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FullCalendarModule,
    MatDialogModule,
    MatRadioModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAJiTvdCB4__gqcZMTkmLaSZWic94KFCvI'
    })
    //ViewUserEventsComponent,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CustomerLayoutComponent,
    OrganizerLayoutComponent,
    SupplierLayoutComponent,
    // FormComponent,
    ArtistLayoutComponent,
    ErrorPageComponent,
    EmailVerifyComponent,
    // ResetPasswordFirebaseComponent,
    // ResetPasswordComponent,
    VenueCalendarComponent,
    LocationOwnerLayoutComponent,
    ModeratorLayoutComponent,
    ReportDialogComponent,
    PaypalPaymentComponent,
    PaymentUsersComponent,
    ViewLocationComponent,
    ViewUserEventsComponent,
    ViewBillComponent   
    //ViewUserEventsComponent,
    // FilterPipe,
   // MyChatsComponent
    // CustomerLayoutComponent,
    // LocationOwnerLayoutComponent,
    // SupplierLayoutComponent,

  ],

  providers: [AuthGuardViewUserEventsService,AuthGuardViewLocationService,AuthGuardAdminService,AuthGuardArtistService,AuthGuardOrganizerService,AuthGuardSupplierService,AuthGuardVenueOwnerService,ChatService,AuthGuardCustomerService,VenueHomeService,VenueProfileResolver,AuthGuardModeratorService,AuthGuardPaymentService,AuthGuardLocationService,CookieService],
  bootstrap: [AppComponent],
  entryComponents: [ReportDialogComponent]
})
export class AppModule { }

