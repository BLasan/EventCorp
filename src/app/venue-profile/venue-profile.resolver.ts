import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { VenueHomeService } from '../venue-module/venue-home/venue-home.service';

@Injectable()
export class VenueProfileResolver implements Resolve<any> {

  constructor(public venueHomeService: VenueHomeService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      this.venueHomeService.getUser(userId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
