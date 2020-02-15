import { Routes } from '@angular/router';
import { VenueProfileComponent } from 'app/venue-profile/venue-profile.component';
import { VenueReservationFormComponent } from 'app/venue-module/venue-reservation-form/venue-reservation-form.component'
// import { VenueHomeComponent } from 'app/venue-module/venue-home/venue-home.component';
import { VenueListComponent } from "../../venue-module/venue-home/venue-list/venue-list.component";
import { VenueAddComponent } from "../../venue-module/venue-home/venue-add/venue-add.component";
import { VenueProfileResolver } from "../../venue-profile/venue-profile.resolver"
import { BookedEventsComponent } from 'app/shared-components/booked-events/booked-events.component';
import { UserLocationComponent } from 'app/shared-components/user-location/user-location.component';


export const LocationOwnerLayoutRoutes: Routes = [
    
    { path:'venueList' , component:VenueListComponent},
    { path: 'venueProfile',component:VenueProfileComponent },
    { path: 'venue-reservation-form', component:VenueReservationFormComponent},
    { path: 'venueAdd', component:VenueAddComponent},
    { path: 'details/:id', component: VenueProfileComponent, resolve:{data : VenueProfileResolver} },
    { path:"booked_events",component:BookedEventsComponent},
    { path: 'maps' , component:UserLocationComponent}
    // { path: 'view-events/:uid' , component:ViewUserEventsComponent},
];
