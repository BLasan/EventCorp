import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Location} from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable()
export class AuthGuardResetPasswordService implements CanActivate {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var path = this.location.prepareExternalUrl(this.location.path());

    if(path.indexOf('/reset-password')>-1)
    return true;
    else{
      this.router.navigate(['/page-not-found']);
      return false;
    }
  }
}

