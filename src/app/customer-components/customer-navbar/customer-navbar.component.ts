import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {prevent_handeling} from '../../../scripts/navbar_settings';
import {navigate_to_login,navigate_to_signup} from '../../../scripts/redirect_to';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.scss']
})
export class CustomerNavbarComponent implements OnInit {

  private listTitles: any[];
  getUser:String='';
  isAdmin:boolean=false;
  isLoggedIn:boolean=false;
  user_name:string;
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

  constructor(private router:Router,location: Location,private element: ElementRef,private auth:AngularFireAuth,private db:AngularFirestore) { 
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
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

     if(localStorage.getItem('loggedIn')==='true') this.isLoggedIn=true;
  }

  signout(){
      var _this=this;
      var _ret=document.getElementById('_return');
     // alert("Signout");
      this.db.collection('register_user').doc(localStorage.getItem('user_name')).update({active_status:"logout"}).then(()=>{
        console.log(_this.auth.auth.currentUser);
        _this.auth.auth.signOut();
        localStorage.removeItem('user_name');
        localStorage.removeItem('role');
        localStorage.removeItem('authToken');
        localStorage.removeItem('nameId');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('searched_user_email');
        localStorage.removeItem('status');
        localStorage.removeItem('isBookingReq');
        _ret.click();
        _this.isLoggedIn=false;
      }).catch(err=>{
          console.log(err)
      })
  }

  // login(){
  //   prevent_handeling();
  //   navigate_to_login();
  //  // this.router.navigate(['/login'])
  // }

  // signUp(){
  //   prevent_handeling();
  //   navigate_to_signup();
  //  // this.router.navigate(['/signup'])
  // }

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

}
