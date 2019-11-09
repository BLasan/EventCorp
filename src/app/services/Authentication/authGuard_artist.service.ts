import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Location} from '@angular/common';
@Injectable()
export class AuthGuardArtistService implements CanActivate {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const isLoggedIn=localStorage.getItem('loggedIn');
    const role=localStorage.getItem('role');
    console.log(isLoggedIn+" "+role);
    var path = this.location.prepareExternalUrl(this.location.path());
    if (isLoggedIn=='true' && role=='artist') {
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

