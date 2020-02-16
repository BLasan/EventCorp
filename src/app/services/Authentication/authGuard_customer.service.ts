import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Location} from '@angular/common';
@Injectable()
export class AuthGuardCustomerService implements CanActivate {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    var path = this.location.prepareExternalUrl(this.location.path());
    console.log(path)
    if(path==='/about-us')
    return true;
    else if(path==='/')
    return true;
    else if(path==='/contact-us') 
    return true;
    else if(path==='/home')
    return true;
    else if(path==='/feedback')
    return true;
    else if(path==='/faq')
    return true;
    else if(path==='/help')
    return true;
    else if(path==='/upcomming-events')
    return true;
    else if(path==='/show-artists') 
    return true;
    else if(path==='/show-providers')
    return true;
    else if(path==='/show-venue'){
      return true;
    }
    else {
      this.router.navigate(['/page-not-found']);
      return false;
    }
  }
}

