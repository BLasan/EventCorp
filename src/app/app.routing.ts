import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {IconsComponent} from './icons/icons.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { FormComponent } from './form/form.component';
import { ArtistComponent } from './Artist-Module/artist/artist.component';
import { ArtistLayoutComponent } from './layouts/artist-layout/artist-layout.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { OrganizerLayoutComponent } from './layouts/organizer-layout/organizer-layout.component';
import { LocationOwnerLayoutComponent } from './layouts/location-owner-layout/location-owner-layout.component';
import { SupplierLayoutComponent } from './layouts/supplier-layout/supplier-layout.component';
import { VenueProfileComponent } from './venue-profile/venue-profile.component';
import { VenueCalendarComponent } from './venue-module/venue-calendar/venue-calendar.component';

//import {ArtistComponent} from './Artist-Module/artist/artist.component';
const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '',
    component: ArtistLayoutComponent,
   children: [
        {
      path: '',
      loadChildren: './layouts/artist-layout/artist-layout.module#ArtistLayoutModule'
  }]},

  {
    path: '',
    component: CustomerLayoutComponent,
   children: [
        {
      path: '',
      loadChildren: './layouts/customer-layout/customer-layout.module#CustomerLayoutModule'
  }]},

  {
    path: '',
    component: OrganizerLayoutComponent,
   children: [
        {
      path: '',
      loadChildren: './layouts/organizer-layout/organizer-layout.module#OrganizerLayoutModule'
  }]},

  {
    path: '',
    component: LocationOwnerLayoutComponent,
   children: [
        {
      path: '',
      loadChildren: './layouts/location-owner-layout/location-owner-layout.module#LocationOwnerLayoutModule'
  }]},

  {
    path: '',
    component: SupplierLayoutComponent,
   children: [
        {
      path: '',
      loadChildren: './layouts/supplier-layout/supplier-layout.module#SupplierLayoutModule'
  }]},

 {
    path: '',
    component: AdminLayoutComponent,
   children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {path: 'venueProfile' , component: VenueProfileComponent},
  {path: 'venueCalendar' , component: VenueCalendarComponent},



  /*
     { path: 'dashboard',      component: DashboardComponent },
     { path: 'user-profile',   component: UserProfileComponent },
     { path: 'table-list',     component: TableListComponent },
     { path: 'typography',     component: TypographyComponent },
     { path: 'icons',          component: IconsComponent },
     { path: 'maps',           component: MapsComponent },
     { path: 'notifications',  component: NotificationsComponent },
     { path: 'upgrade',        component: UpgradeComponent },

*/
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
