import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES, ROUTES2, ROUTES4, ROUTES3 } from '../sidebar/sidebar.component';
import { ROUTES1} from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import {onIdentify} from '../../../scripts/side_bar.js';
import { SearchUserService } from 'app/services/search_user.service';
import { LoginService } from 'app/services/login.services';
import { NotificationService } from 'app/services/notification.service';
import {click_redirect_href} from '../../../scripts/search_bar_activate';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    getUser:String='';
    isAdmin:boolean=false;
    user_details:any;
    emp:any=[{age:'abdcc'}]
    count:any=0;
    role:string;
    route_link:string;
    location: Location;
    notification_count:any;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    constructor(location: Location,private element: ElementRef, private router: Router , private _search_user:SearchUserService,private _loginService:LoginService,private _notification_service:NotificationService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
    
    // if(localStorage.getItem('notification_count'))
    // this.count=localStorage.getItem('notification_count');
    // this.count=this.notifications.get_notification_count();
    // alert(this.count);
    //   this.getUser=onIdentify();
    this.getNotificationCount();
    if(localStorage.getItem('role')=='artist' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES1.filter(listTitle=>listTitle);
        this.route_link="/artist-notifications  ";
    }
  
    else if(localStorage.getItem('role')=='organizer' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES2.filter(listTitle=>listTitle);
        this.route_link="/organizer-notifications"
    }
   
    else if(localStorage.getItem('role')=='supplier' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES4.filter(listTitle=>listTitle);
        this.route_link="/supplier-notifications"
    }
    

    else if(localStorage.getItem('role')=='admin' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES.filter(listTitle=>listTitle);
        this.route_link="/admin-notifications"
    }
    

    else if(localStorage.getItem('role')=='venue_owner' && localStorage.getItem('loggedIn')){
        this.listTitles=ROUTES3.filter(listTitle=>listTitle);
        this.route_link="/venue-owner-notifications"
    }

    this._search_user.getUsers(localStorage.getItem('role')).subscribe(data=>{
        this.user_details=data;
        // if(localStorage.getItem('searched_user_email'))
        //   localStorage.removeItem('searched_user_email');
        console.log(this.user_details);
    });

    //   if(this.getUser=='artist')
    //   this.listTitles=ROUTES1.filter(listTitle=>listTitle);

    //   else{
    //     this.listTitles = ROUTES.filter(listTitle => listTitle);
    //     this.isAdmin=true;
    //   }
     
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

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
    //   titlee = titlee.split('/').pop();

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
    }

    logoutUser(){
        this._loginService.logOut();
        if(localStorage.getItem('searched_user_email'))
         localStorage.removeItem('searched_user_email');
    }

    addUserEmail(email:string){
       // alert(email)
        localStorage.setItem('searched_user_email',email);
        click_redirect_href();
    }

    update_count(count:number){
        this.count=count;
    }

    getNotificationCount(){
        let user=localStorage.getItem('user_name');
        this._notification_service.getNotificationCount(user).subscribe(size=>{
            console.log(size);
            this.notification_count=size
            this.count=this.notification_count.size;
        });
    }

    
}
