import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Location} from '@angular/common';
@Injectable()
export class AuthGuardPaymentService implements CanActivate {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const isLoggedIn=localStorage.getItem('loggedIn');
    const role=localStorage.getItem('role');
    var path = this.location.prepareExternalUrl(this.location.path());
    if (isLoggedIn=='true' && role=='organizer') {
      return true;
    } 
    else if(path.indexOf("/user-payments")>-1)
    return true;
    else if(path.indexOf("/payment")>-1)
    return true;
    else {
      this.router.navigate(['/page-not-found']);
      return false;
    }
  }
}

