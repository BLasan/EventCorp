import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ArtistLayoutComponent } from './layouts/artist-layout/artist-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SettingsComponent } from './shared-components/settings/settings.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { LoginComponent } from './Login-SignUp/login/login.component';
import { SignupComponent } from './Login-SignUp/signup/signup.component';
//import {ArtistComponent} from './Artist-Module/artist/artist.component';
import {getRole} from './services/select_role.service';
import { AuthGuardAdminService } from './services/Authentication/authGuard_admin.service';
import { AuthGuardArtistService } from './services/Authentication/authGuard_artist.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OnlineChatComponent } from './Modules/online-chat/online-chat.component';
import { RatingSystemComponent } from './shared-components/rating-system/rating-system.component';
import { PaypalPaymentComponent } from './shared-components/paypal-payment/paypal-payment.component';
import { OrganizerLayoutComponent } from './layouts/organizer-layout/organizer-layout.component';
import { AuthGuardOrganizerService } from './services/Authentication/authGuard_organizer.service';
import { MyChatsComponent } from './shared-components/my-chats/my-chats.component';
import { EmailVerifyComponent } from './Modules/email-verify/email-verify.component';
import { SupplierLayoutComponent } from './layouts/supplier-layout/supplier-layout.component';
import { AuthGuardSupplierService } from './services/Authentication/athGuard_supplier.service';
import { ResetPasswordComponent } from './Modules/reset-password/reset-password.component';
import { ResetPasswordFirebaseComponent } from './Modules/reset-password-firebase/reset-password-firebase.component';
import { AuthGuardCustomerService } from './services/Authentication/authGuard_customer.service';
import { VenueCalendarComponent } from './venue-module/venue-calendar/venue-calendar.component';
// import { VenueProfileComponent } from './venue-profile/venue-profile.component';
import { AuthGuardVenueOwnerService } from './services/Authentication/authGuard_venueOwner.service';
import { LocationOwnerLayoutComponent } from './layouts/location-owner-layout/location-owner-layout.component';
import { HelpComponent } from './shared-components/help/help.component';
import { AuthGuardModeratorService } from './services/Authentication/authGuard_moderator.service';
import { ModeratorLayoutComponent } from './layouts/moderator-layout/moderator-layout.component';
import { ViewAllProductsComponent } from './Modules/Supplier-Module/view-all-products/view-all-products.component';
import { PaymentUsersComponent } from './Modules/Organizer-Module/payment-users/payment-users.component';
import { AuthGuardPaymentService } from './services/Authentication/authGuard_payment.service';
import { ViewLocationComponent } from './shared-components/view-location/view-location.component';
import { AuthGuardLocationService } from './services/Authentication/authGuardLocation.service';
//import { ViewUserEventsComponent } from './shared-components/view-user-events/view-user-events.component';
import { AuthGuardResetPasswordService } from './services/Authentication/authGuard_reset_password.service';
import { ShowProvidersComponent } from './Modules/Customer-Module/show-providers/show-providers.component';
import { AuthGuardViewLocationService } from './services/Authentication/authGuard_view_location.service';
import { ViewUserEventsComponent } from './shared-components/view-user-events/view-user-events.component';
import { AuthGuardViewUserEventsService } from './services/Authentication/authGuardViewUserEvents.service';
import { ViewBillComponent } from './Modules/Organizer-Module/view-bill/view-bill.component';

//var role=getRole();
// if(role=='artist'){
  
// }
const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'email-verify/:link',
    component:EmailVerifyComponent
  },
  {
    path:'view-bill/:name/:email/:city/:date/:time/:amount/:id/:user_name',
    component:ViewBillComponent,
    canActivate:[AuthGuardViewUserEventsService]
  },
  {
    path:'enter-email-reset-password',
    component:ResetPasswordComponent
  },
  {
    path:'reset-password/:link/:uid/:email',
    component:ResetPasswordFirebaseComponent,
    canActivate:[AuthGuardResetPasswordService],
  },
  {
    path:'view-location/:uid',
    component:ViewLocationComponent,
    canActivate:[AuthGuardViewLocationService],
  },
  {
    path:'view-user-events/:uid',
    component:ViewUserEventsComponent,
    canActivate:[AuthGuardViewUserEventsService],
  },
  // {
  //   path:'reset-password',
  //   component:ResetPasswordFirebaseComponent
  // },
  
  {
    path: '',
    component: OrganizerLayoutComponent,
    canActivate:[AuthGuardOrganizerService],
    children: [
        {
      path: '',
      loadChildren: './layouts/organizer-layout/organizer-layout.module#OrganizerLayoutModule'
  }]},
  
  {
    path: '',
    component: ArtistLayoutComponent,
    canActivate:[AuthGuardArtistService],
   children: [
        {
      path: '',
      loadChildren: './layouts/artist-layout/artist-layout.module#ArtistLayoutModule'
  }]},
  // {
  //   path:'settings',
  //   component:SettingsComponent
  // },
  
  // {
  //   path:'ratings/:token',
  //   component:RatingSystemComponent
  // },
  {
    path: '',
    component: CustomerLayoutComponent,
    canActivate:[AuthGuardCustomerService],
    children: [
        {
      path: '',
      loadChildren: './layouts/customer-layout/customer-layout.module#CustomerLayoutModule'
  }]},
  // {
  //   path:'settings',
  //   component:SettingsComponent
  // },


  // {
  //   path:'ratings/:token',
  //   component:RatingSystemComponent
  // },
  {
    path: '',
    component: SupplierLayoutComponent,
    canActivate:[AuthGuardSupplierService],
   children: [
        {
      path: '',
      loadChildren: './layouts/supplier-layout/supplier-layout.module#SupplierLayoutModule'
  }]},

  {
    path: '',
    component: LocationOwnerLayoutComponent,
    canActivate:[AuthGuardVenueOwnerService],
   children: [
        {
      path: '',
      loadChildren: './layouts/location-owner-layout/location-owner-layout.module#LocationOwnerLayoutModule'
  }]},
  {
    path: '',
    component: ModeratorLayoutComponent,
    canActivate:[AuthGuardModeratorService],
   children: [
        {
      path: '',
      loadChildren: './layouts/moderator-layout/moderator-layout.module#ModeratorLayoutModule'
  }]},
  // {
  //   path: '',
  //   component: SupplierLayoutComponent,
  //  children: [
  //       {
  //     path: '',
  //     loadChildren: './layouts/supplier-layout/supplier-layout.module#SupplierLayoutModule'
  // }]},

 {
    path: '',
    component: AdminLayoutComponent,
    canActivate:[AuthGuardAdminService],
   children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},

  
  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'signup',
    component:SignupComponent
  },
  { path:'payment/:item_name/:quantity/:amount',
    component:PaypalPaymentComponent,
    canActivate:[AuthGuardPaymentService],
  },
  { path:'user-payments/:user_name/:user_email/:quantity/:amount/:_id/:booking_id',
    component:PaymentUsersComponent,
    canActivate:[AuthGuardPaymentService],
  },
  { path:'view-location/:id',
    component:ViewLocationComponent,
    canActivate:[AuthGuardLocationService],
  },
  // { path:'view-events/:uid' , 
  //   component:ViewUserEventsComponent
  // },


  // {
  //   path: '',
  //   component: CustomerLayoutComponent,
  //  children: [
  //       {
  //     path: '',
  //     loadChildren: './layouts/customer-layout/customer-layout.module#CustomerLayoutModule'
  // }]},

  // {
  //   path: '',
  //   component: OrganizerLayoutComponent,
  //  children: [
  //       {
  //     path: '',
  //     loadChildren: './layouts/organizer-layout/organizer-layout.module#OrganizerLayoutModule'
  // }]},

  // {path: 'venueProfile' , component: VenueProfileComponent},
  {path: 'venueCalendar' , component: VenueCalendarComponent},
  // {
  //   path:'location_owner',
  //   component:LocationOwnerLayoutComponent
  // },
  {
    path:'page-not-found',
    component:ErrorPageComponent
  },
  {
    path:'chat-app',
    component:OnlineChatComponent
  },
  {
    path:'**',
    component:ErrorPageComponent
  },


  // {
  //   path: '',
  //   component: CustomerLayoutComponent,
  //  children: [
  //       {
  //     path: '',
  //     loadChildren: './layouts/customer-layout/customer-layout.module#CustomerLayoutModule'
  // }]},

  // {
  //   path: '',
  //   component: OrganizerLayoutComponent,
  //  children: [
  //       {
  //     path: '',
  //     loadChildren: './layouts/organizer-layout/organizer-layout.module#OrganizerLayoutModule'
  // }]},

  // {
  //   path: '',
  //   component: LocationOwnerLayoutComponent,
  //  children: [
  //       {
  //     path: '',
  //     loadChildren: './layouts/location-owner-layout/location-owner-layout.module#LocationOwnerLayoutModule'
  // }]},

  //   {
  //   path:'chat-app',
  //   component:OnlineChatComponent
  // },

];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [],
})
export class AppRoutingModule { }
