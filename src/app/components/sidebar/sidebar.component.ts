import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs-compat/operator/filter';
import { getRole } from 'app/services/select_role.service.js';
import { SearchUserService } from 'app/services/search_user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ViewRequestStatusComponent } from 'app/Modules/Organizer-Module/view-request-status/view-request-status.component';
declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

//admin-routings
export const ROUTES: RouteInfo[] = [
    { path: '/admin-dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/admin-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/user-details', title: 'User-Details',  icon:'content_paste', class: '' },
    { path: '/add-new-moderator', title: 'Add New Moderator',  icon: 'add', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/admin-notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];


//artist routings
export const ROUTES1: RouteInfo[] = [
  { path: '/artist-home', title: 'Home',  icon: 'home', class: '' },
  { path: '/artist-calendar', title: 'Event Calendar',  icon: 'calendar_today', class: '' },
  // { path: '/artist-notifications', title: 'Notifications',  icon: 'notifications', class: '' },
  { path: '/artist-profile', title: 'Edit Profile',  icon: 'file_copy', class: '' },
  { path: '/artist-settings', title: 'Settings',  icon: 'settings', class: '' },
  { path: '/add-playlist' , title: 'Add Playlist' , icon: 'add' , class: ''},
  { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];


//organizer routings
export const ROUTES2:RouteInfo[]=[
  { path: '/organizer-home', title: 'Home',  icon: 'home', class: '' },
  // { path:'/organizer-notifications',title:'Notifications',icon:'notifications',class:''},
  { path:'/organizer-settings',title:'Settings',icon:'settings',class:''},
  { path:'/organizer-events',title:'Events',icon:'calendar_today',class:''},
  { path:'/organizer-profile',title:'Edit Profile',icon:'file_copy',class:''},
  { path:'/view-request-status',title:'View Requests',icon:'watch_later',class:''},
  { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
];


//venue_owner routings
export const ROUTES3:RouteInfo[]=[
  { path:'/venueList' , title: 'Home' ,icon:'home',class:''},
  { path: '/venueProfile',title: 'Profile' ,icon:'file_copy',class:'' },
  { path: '/venue-reservation-form', title: 'Reservation' ,icon:'calendar_today',class:''},
  { path: '/venueAdd', title: 'Add Venue' ,icon:'add',class:''},
  { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
];


//supplier routings
export const ROUTES4:RouteInfo[]=[
  { path: '/supplier-home', title: 'Home',  icon: 'home', class: '' },
  // { path: '/supplier-notifications', title: 'Notifications',icon:'notifications',class:''},
  { path:'/supplier-settings',title:'Settings',icon:'settings',class:''},
  { path:'/supplier-events',title:'Events',icon:'calendar_today',class:''},
  { path:'/supplier-profile',title:'Edit Profile',icon:'file_copy',class:''},
  { path:'/supplier-add-items',title:'Add Product Catalog',icon:'add',class:''},
  { path:'/supplier-products',title:'Manage Products',icon:'shopping_cart',class:''},
  { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
];

//moderator routings
export const ROUTES5:RouteInfo[]=[
  { path: '/moderator-dashboard', title: 'Home',  icon: 'home', class: '' },
  { path: '/moderator-notifications', title: 'Notifications',icon:'notifications',class:''},
  { path:'/moderator-settings',title:'Settings',icon:'settings',class:''},
  // { path:'/moderator-queries',title:'Queries',icon:'settings',class:''},
  // { path:'/report-warnings',title:'Product Catalog',icon:'add',class:''}
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
  user_details:any=[];
  constructor( private _search_user:SearchUserService,private database:AngularFirestore) { }

  ngOnInit() {
   
    if(localStorage.getItem('role')=='artist' && localStorage.getItem('loggedIn')){
      this.menuItems=ROUTES1.filter(listTitle=>listTitle);
      this.route_link="/artist-notifications";
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

  else if(localStorage.getItem('role')=='moderator' && localStorage.getItem('loggedIn')){
    this.menuItems=ROUTES5.filter(listTitle=>listTitle);
    this.route_link="/moderator-notifications"  
  }
  
  var _this=this;

  var docRef = this.database.firestore.collection('register_user');
  docRef.get()
  .then(snapshot => {
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  
  snapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
    if(doc.data().role!=localStorage.getItem('role'))
    _this.user_details.push(doc.data());
  });
  })
.catch(err => {
  console.log('Error getting documents', err);
});

  // this._search_user.getUsers(localStorage.getItem('role')).subscribe(data=>{
  //   this.user_details=data;
  //   // if(localStorage.getItem('searched_user_email'))
  //   //   localStorage.removeItem('searched_user_email');
  //   console.log(this.user_details);
  // });

   
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
