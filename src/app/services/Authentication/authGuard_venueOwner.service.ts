import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Location} from '@angular/common';
@Injectable()
export class AuthGuardVenueOwnerService implements CanActivate {

  constructor(
    private router: Router,
    private location:Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const isLoggedIn=localStorage.getItem('loggedIn');
    const role=localStorage.getItem('role');
    var path = this.location.prepareExternalUrl(this.location.path());
    if (isLoggedIn=='true' && role=='venue_owner') {
      return true;
    } 
    else if(path.indexOf("/ratings")>-1)
    return true;
    else {
      this.router.navigate(['/page-not-found']);
      return false;
    }
  }
}

