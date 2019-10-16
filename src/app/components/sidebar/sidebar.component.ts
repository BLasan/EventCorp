import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs-compat/operator/filter';
import { getRole } from 'app/services/select_role.service.js';
import { SearchUserService } from 'app/services/search_user.service';
declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

export const ROUTES1: RouteInfo[] = [
  { path: '/artist-home', title: 'Home',  icon: 'home', class: '' },
  { path: '/artist-calendar', title: 'Event Calendar',  icon: 'calendar_today', class: '' },
  { path: '/artist-notifications', title: 'Notifications',  icon: 'view_list', class: '' },
  { path: '/artist', title: 'Edit Profile',  icon: 'file_copy', class: '' },
  { path: '/artist-settings', title: 'Settings',  icon: 'settings', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

export const ROUTES2:RouteInfo[]=[
  { path: '/organizer-home', title: 'Home',  icon: 'home', class: '' },
  { path:'/organizer-notification',title:'Notifications',icon:'notifications',class:''},
  { path:'/organizer-settings',title:'Settings',icon:'settings',class:''},
  { path:'/organizer-events',title:'Events',icon:'calendar_today',class:''},
  { path:'/organizer-profile',title:'Edit Profile',icon:'file_copy',class:''}
];

export const ROUTES3:RouteInfo[]=[
  { path: '/location-owner-home', title: 'Home',  icon: 'home', class: '' },
];

export const ROUTES4:RouteInfo[]=[
  { path: '/supplier-home', title: 'Home',  icon: 'home', class: '' },
  { path: '/supplier-notifications', title: 'Notifications',icon:'notifications',class:''},
  { path:'/supplier-settings',title:'Settings',icon:'settings',class:''},
  { path:'/suplier-events',title:'Events',icon:'calendar_today',class:''},
  { path:'/supplier-profile',title:'Edit Profile',icon:'file_copy',class:''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','./sidebar.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  getUser:String='';
  isAdmin:boolean=false;
  route_link:any;
  user_details:any;
  constructor( private _search_user:SearchUserService) { }

  ngOnInit() {
   
    if(localStorage.getItem('role')=='artist' && localStorage.getItem('loggedIn')){
      this.menuItems=ROUTES1.filter(listTitle=>listTitle);
      this.route_link="/artist-notifications  ";
  }

  else if(localStorage.getItem('role')=='organizer' && localStorage.getItem('loggedIn')){
      this.menuItems=ROUTES2.filter(listTitle=>listTitle);
      this.route_link="/organizer-notifications"
  }
 
  else if(localStorage.getItem('role')=='supplier' && localStorage.getItem('loggedIn')){
      this.menuItems=ROUTES4.filter(listTitle=>listTitle);
      this.route_link="/supplier-notifications"
  }
  

  else if(localStorage.getItem('role')=='admin' && localStorage.getItem('loggedIn')){
      this.menuItems=ROUTES.filter(listTitle=>listTitle);
      this.route_link="/admin-notifications"
  }
  

  else if(localStorage.getItem('role')=='venue_owner' && localStorage.getItem('loggedIn')){
      this.menuItems=ROUTES3.filter(listTitle=>listTitle);
      this.route_link="/venue-owner-notifications"
  }

  this._search_user.getUsers(localStorage.getItem('role')).subscribe(data=>{
    this.user_details=data;
    // if(localStorage.getItem('searched_user_email'))
    //   localStorage.removeItem('searched_user_email');
    console.log(this.user_details);
  });

   
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
