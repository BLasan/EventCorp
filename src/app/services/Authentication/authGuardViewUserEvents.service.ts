import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Location} from '@angular/common';
@Injectable()
export class AuthGuardViewUserEventsService implements CanActivate {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const isLoggedIn=localStorage.getItem('loggedIn');
    const role=localStorage.getItem('role');
    // const role=localStorage.getItem('role');
    // var path = this.location.prepareExternalUrl(this.location.path());
    console.log(isLoggedIn)
    if (isLoggedIn=='true' && role==='organizer') {
      return true;
    } 
  }
}

