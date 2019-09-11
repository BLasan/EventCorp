import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {prevent_handeling} from '../../../scripts/navbar_settings';
@Component({
  selector: 'customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.scss']
})
export class CustomerNavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {

  }

  login(){
    prevent_handeling();
    this.router.navigate(['/login'])
  }

  signUp(){
    prevent_handeling();
    this.router.navigate(['/signup'])
  }

}
