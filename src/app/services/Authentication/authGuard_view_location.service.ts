import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Location} from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable()
export class AuthGuardViewLocationService implements CanActivate {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var path = this.location.prepareExternalUrl(this.location.path());
    var isLoggedIn=localStorage.getItem('loggedIn');
    if((path.indexOf('/view-location')>-1) && isLoggedIn==='true')
    return true;
    else{
      this.router.navigate(['/page-not-found']);
      return false;
    }
  }
}

