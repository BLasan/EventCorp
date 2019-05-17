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
import { TestComponent } from './test/test.component';
//import {ArtistComponent} from './Artist-Module/artist/artist.component';
const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 

  {
    path:'test',
    component:TestComponent,
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
    component: AdminLayoutComponent,
   children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},



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
