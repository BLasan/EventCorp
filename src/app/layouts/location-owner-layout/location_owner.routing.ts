import { Routes } from '@angular/router';
// import { VenueProfileComponent } from 'app/venue-profile/venue-profile.component';
import { VenueReservationFormComponent } from 'app/venue-module/venue-reservation-form/venue-reservation-form.component'
// import { VenueHomeComponent } from 'app/venue-module/venue-home/venue-home.component';
// import { VenueListComponent } from "../../venue-module/venue-home/venue-list/venue-list.component";
import { VenueAddComponent } from "../../venue-module/venue-home/venue-add/venue-add.component";
import { VenueProfileResolver } from "../../venue-profile/venue-profile.resolver"
import { BookedEventsComponent } from 'app/shared-components/booked-events/booked-events.component';
import { UserLocationComponent } from 'app/shared-components/user-location/user-location.component';
import { VenueNotificationsComponent } from '../../venue-module/venue-notifications/venue-notifications.component';
import { VenueSettingsComponent } from "../../venue-module/venue-settings/venue-settings.component";
// import { ViewUserEventsComponent } from 'app/shared-components/view-user-events/view-user-events.component';
import { VenueDashboardComponent } from "../../venue-module/venue-dashboard/venue-dashboard.component";
import { VenueCalendarComponent } from 'app/venue-module/venue-calendar/venue-calendar.component';
import { VenueEditComponent } from 'app/venue-module/venue-home/venue-edit/venue-edit.component';
import { VenueOwnerProfileComponent } from '../../venue-module/venue-owner-profile/venue-owner-profile.component';
import { AllRequestsComponent } from '../../venue-module/all-requests/all-requests.component';


export const LocationOwnerLayoutRoutes: Routes = [
    
    // { path:'venueList' , component:VenueListComponent},
    // { path: 'venueProfile',component:VenueProfileComponent },
    { path: 'venue-reservation-form', component:VenueReservationFormComponent},
    { path: 'venueAdd', component:VenueAddComponent},
    // { path: 'details/:id', component: VenueProfileComponent, resolve:{data : VenueProfileResolver} },
    { path:"venue_owner-booked_events",component:BookedEventsComponent},
    { path: 'venue-owner-maps' , component:UserLocationComponent},
    // { path: 'view-events/:uid' , component:ViewUserEventsComponent},
    { path: 'venue-settings', component:VenueSettingsComponent},
    { path: 'venue-notifications', component:VenueNotificationsComponent},
    { path: 'venue-dashboard', component:VenueDashboardComponent},
    { path: 'venueCalendar', component:VenueCalendarComponent},
    { path: 'venue-edit', component:VenueEditComponent},
    { path: 'venueOwnerProfile', component:VenueOwnerProfileComponent},
    { path: 'allrequests', component:AllRequestsComponent}



];
