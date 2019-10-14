import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {prevent_handeling} from '../../../scripts/navbar_settings';
import {navigate_to_login,navigate_to_signup} from '../../../scripts/redirect_to';
@Component({
  selector: 'customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.scss']
})
export class CustomerNavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {

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

}
