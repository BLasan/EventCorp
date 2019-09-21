import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class AuthGuardVenueOwnerService implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const isLoggedIn=localStorage.getItem('loggedIn');
    const role=localStorage.getItem('role');
    if (isLoggedIn=='true' && role=='venue_owner') {
      return true;
    } else {
      this.router.navigate(['/page-not-found']);
      return false;
    }
  }
}

