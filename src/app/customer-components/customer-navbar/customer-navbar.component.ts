import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['/login'])
  }

  signUp(){
    this.router.navigate(['/signup'])
  }

}
