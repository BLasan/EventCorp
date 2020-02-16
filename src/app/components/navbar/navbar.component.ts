import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES, ROUTES2, ROUTES4, ROUTES3, ROUTES5 } from '../sidebar/sidebar.component';
import { ROUTES1} from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { SearchUserService } from 'app/services/search_user.service';
import { LoginService } from 'app/services/login.services';
import { NotificationService } from 'app/services/notification.service';
import {click_redirect_href} from '../../../scripts/search_bar_activate';
import {disable_drop_down,previous_mode} from '../../../scripts/disable_a_href';
import { AdminService } from 'app/services/admin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { disable_logout} from '../../../scripts/disable_a_href';
import { AngularFireAuth } from '@angular/fire/auth';
import { navigate_to_home} from '../../../scripts/logout';
import { LoadedRouterConfig } from '@angular/router/src/config';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    getUser:String='';
    isAdmin:boolean=false;
    user_details:any=[];
    emp:any=[{age:'abdcc'}]
    count:any=0;
    home_link:String;
    route_link:string;
    location: Location;
    data:any=[];
    notification_count:number=0;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    onLoaded:boolean=true;
    user_role:string;
    booked_events_href:string="";
    elements:any;
    private sidebarVisible: boolean;
    constructor(location: Location,private element: ElementRef, private router: Router , private _search_user:SearchUserService,private _loginService:LoginService,private _notification_service:NotificationService,private _admin_notification_count:AdminService,private _db:AngularFirestore,private auth:AngularFireAuth) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
       // disable_logout();
    this.elements=(<HTMLElement>document.getElementById('notification_count_id'));
    if(this.count===0) this.elements.style.display="none";
    console.log(this.elements)
    this.getNotificationCount();
    //get notification count
    // if(localStorage.getItem('role')!='admin')
    // this.getNotificationCount();
    // else
    // this.getAdminNotificationCount();

    //previous_mode();
    this.user_role=localStorage.getItem('role');
    this.booked_events_href="/"+this.user_role+"-booked_events";

    if(localStorage.getItem('role')=='artist' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES1.filter(listTitle=>listTitle);
        this.route_link="/artist-notifications";
        this.home_link="/artist-home";
    }
  
    else if(localStorage.getItem('role')=='organizer' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES2.filter(listTitle=>listTitle);
        this.route_link="/organizer-notifications";
        this.home_link="/organizer-home";
    }
   
    else if(localStorage.getItem('role')=='supplier' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES4.filter(listTitle=>listTitle);
        this.route_link="/supplier-notifications";
        this.home_link="/supplier-home"
    }
    

    else if(localStorage.getItem('role')=='admin' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES.filter(listTitle=>listTitle);
        this.route_link="/admin-notifications";
        this.home_link="/admin-dashboard";
    }
    
    else if(localStorage.getItem('role')=='moderator' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES5.filter(listTitle=>listTitle);
        this.route_link="/moderator-notifications";
        this.home_link="/moderator-home";
    }

    else if(localStorage.getItem('role')=='venue_owner' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES3.filter(listTitle=>listTitle);
        this.route_link="/venue-owner-notifications";
        this.home_link="/venueList";
    }

    var _this=this;


    //get user details
    var docRef = this._db.firestore.collection('register_user');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
      if(doc.data().role!=localStorage.getItem('role') && doc.data().role!=='admin' && doc.data().role!=='moderator')
      _this.user_details.push(doc.data());
    });
    }).catch(err => {
        console.log('Error getting documents', err);
    });

     
      //toggling feature
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    //open sidebar
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    //get title of the routing
    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      //console.log(titlee)
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
    //   titlee = titlee.split('/').pop();

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }

      if(titlee.indexOf('ratings')>-1) return "View User Details";
      if(titlee.indexOf('view-all-products')>-1) return "All Products";
      if(titlee.indexOf('update-events')>-1) return "Edit Events";
      if(titlee.indexOf('view-all-events')>-1) return "View All Events";
      if(titlee.indexOf('notifications')>-1) return "Notifications";
      if(titlee==='/payment-bill') return "Payments";
      if(titlee.indexOf('/booked_events')) return "Booked Events";
    }

    logout_User(event:any){  
        event.preventDefault();
        var _this=this;
        var user=localStorage.getItem('user_name');
        // alert(user);
        // alert(this.auth.auth.currentUser.uid)
        console.log(user);
        var _auth=this.auth.auth;
        var _home=document.getElementById('logout_route');
        // alert(user)
        // disable_logout();
        this._db.firestore.collection('register_user').doc(user).update({active_status:'logout'}).then(()=>{
            _auth.signOut();
            _home.click();
        }).catch(err=>{
            console.log(err);
        });

        //remove localstorage items
        localStorage.removeItem('user_name');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('nameId');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('searched_user_email');
        localStorage.removeItem('status');
        localStorage.removeItem('isBookingReq');
        // navigate_to_home();
        // this._loginService.logOut();
        // if(localStorage.getItem('searched_user_email'))
        //  localStorage.removeItem('searched_user_email');
    }

    //store searched user email
    addUserEmail(email:string){
        //alert(email)
        localStorage.setItem('searched_user_email',email);
        //click_redirect_href();
    }


    update_count(count:number){
        this.count=count;
    }


    getNotificationCount(){
        var _this=this;
        console.log(this.elements);
        let user=localStorage.getItem('user_name');
        console.log(user)
        this._db.firestore.collection("register_user").doc(user).collection('notification-messages')
        .onSnapshot(function(snapshot) {
            let changes=snapshot.docChanges();
            console.log(changes);
            changes.forEach(element => {
                console.log(element.type)
                if(element.type=='added' && element.doc.data().view===false){
                    _this.notification_count+=1;
                    console.log(_this.notification_count);
                    if(_this.notification_count==0) _this.elements.style.display="none";
                    else{
                        _this.elements.removeAttribute('style');
                        _this.elements.innerHTML=_this.notification_count.toString();
                    }
                    
                 }
     
                // else if(element.type=='modified'){
                //     if(element.doc.data().view)
                //     _this.notification_count-=1;
                //     else
                //     _this.notification_count+=1;
                //     elements.innerHTML=_this.notification_count.toString();
                //     console.log(_this.notification_count)
                // }
     
                else if(element.type=='removed'){
                    if(_this.notification_count==0) _this.elements.style.display="none";
                    else{
                        _this.elements.removeAttribute('style');
                        _this.elements.innerHTML=_this.notification_count.toString();
                    }
                }
            });
        });

        this._db.firestore.collection("register_user").doc(user).collection('bookings')
        .onSnapshot(function(snapshot) {
            let changes=snapshot.docChanges();
            console.log(changes);
            changes.forEach(element => {
                if(element.type=='added' && element.doc.data().view===false){
                    _this.notification_count+=1;
                    console.log(_this.notification_count);
                    if(_this.notification_count==0) _this.elements.style.display="none";
                    else{
                        _this.elements.removeAttribute('style');
                        _this.elements.innerHTML=_this.notification_count.toString();
                    }
                 }
     
                // else if(element.type=='modified'){
                //     alert(_this.notification_count)
                //     if(!element.doc.data().view){
                //         _this.notification_count+=1;
                       
                //         elements.innerHTML=_this.notification_count.toString();
                //     }
                // }
     
                else if(element.type=='removed'){
                   
                }
            });
        });

        this._db.firestore.collection("register_user").doc(user).collection('chats')
        .onSnapshot(function(snapshot) {
            let changes=snapshot.docChanges();
            console.log(changes);
            changes.forEach(element => {
                if(element.type=='added' && element.doc.data().view===false){
                    _this.notification_count+=1;
                    if(_this.notification_count==0) _this.elements.style.display="none";
                    else{
                        _this.elements.removeAttribute('style');
                        _this.elements.innerHTML=_this.notification_count.toString();
                    }
                 }
     
                else if(element.type=='modified'){
                    if(!element.doc.data().view)
                    _this.notification_count+=1;
                    if(_this.notification_count==0) _this.elements.style.display="none";
                    else{
                        _this.elements.removeAttribute('style');
                        _this.elements.innerHTML=_this.notification_count.toString();
                    }
                }
     
                else if(element.type=='removed'){
                   
                }
            });
        });


    //     var docRef = this._db.firestore.collection('register_user').doc(user).collection('notification-messages').where("view","==",false);
    //     docRef.get()
    //     .then(snapshot1 => {
    //         var docRefs = _this._db.firestore.collection('register_user').doc(user).collection('bookings').where("view","==",false);
    //         docRefs.get()
    //         .then(snapshot2 => {
    //               if(snapshot1.empty && snapshot2.empty) _this.notification_count=0;
    //               else if(snapshot2.empty){
    //                   snapshot1.forEach(docs=>{
    //                       _this.notification_count+=1;
    //                       console.log(_this.notification_count)
    //                   })
    //               }
    //               else if(snapshot1.empty){
    //                   snapshot2.forEach(docs=>{
    //                       _this.notification_count+=1;
    //                   })
    //               }
    //               else if(!snapshot2.empty && !snapshot1.empty){
    //                   snapshot1.forEach(docs=>{
    //                       _this.notification_count+=1;
    //                   })
    //                   snapshot2.forEach(docs=>{
    //                       _this.notification_count+=1;
    //                   })
    //               }
    //         })
    //       .catch(err => {
    //         console.log('Error getting documents', err);
    //       });
    //     })
    //   .catch(err => {
    //     console.log('Error getting documents', err);
    //   });
        // this._notification_service.getNotificationCount(user).subscribe(size=>{
        //     console.log(size);
        //     this.notification_count=size                                                                                                                                        
        //     this.count=this.notification_count.size;
        // });
    }

    getAdminNotificationCount(){
        this._admin_notification_count.get_realtime().subscribe(data=>{
            this.data=data;
            this.count=this.data.length;
        })
    }                                                                                                                                       

    
    show(){
        if(this.onLoaded)
        disable_drop_down();
        else
        previous_mode();
        this.onLoaded=false;

    }
    
}
