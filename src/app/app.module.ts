
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

const config = {
  apiKey: "AIzaSyA95SG6_4tkcDHDySiuQfVt9cbm_kyUwhk",
  authDomain: "eventcorppro.firebaseapp.com",
  databaseURL: "https://eventcorppro.firebaseio.com",
  projectId: "eventcorppro",
  storageBucket: "eventcorppro.appspot.com",
  messagingSenderId: "886719532814",
  appId: "1:886719532814:web:9424058ace3d13af"
};

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
    SharedComponentsModule,
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
    AngularFirestoreModule.enablePersistence(), // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
    
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
    PaypalPaymentComponent,
    EmailVerifyComponent,
    ResetPasswordComponent,
    ResetPasswordFirebaseComponent,
   // MyChatsComponent
    // CustomerLayoutComponent,
    // LocationOwnerLayoutComponent,
    // SupplierLayoutComponent,

  ],

  providers: [AuthGuardAdminService,AuthGuardArtistService,AuthGuardOrganizerService,AuthGuardSupplierService,AuthGuardVenueOwnerService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }

