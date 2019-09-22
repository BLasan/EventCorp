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

  {
    path:'settings',
    component:SettingsComponent
  },
  // {
  //   path:'ratings/:token',
  //   component:RatingSystemComponent
  // },
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/customer-layout/customer-layout.module#CustomerLayoutModule'
  }]},
  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'payment',
    component:PaypalPaymentComponent
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
  }

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
