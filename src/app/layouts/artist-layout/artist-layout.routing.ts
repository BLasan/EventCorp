import { Routes } from '@angular/router';
import { ArtistComponent } from 'app/Artist-Module/artist/artist.component';
import { ArtistCalendarComponent } from 'app/Artist-Module/artist-calendar/artist-calendar.component';
import { ArtistNotificationComponent } from 'app/Artist-Module/artist-notification/artist-notification.component';
import { ArtistRequestComponent } from 'app/Artist-Module/artist-request/artist-request.component';
import { ArtistHomeComponent } from 'app/Artist-Module/artist-home/artist-home.component';
import { VenueProfileComponent } from 'app/venue-profile/venue-profile.component';
import { VenueReservationFormComponent } from 'app/venue-module/venue-reservation-form/venue-reservation-form.component'
// import { VenueHomeComponent } from 'app/venue-module/venue-home/venue-home.component';
import { VenueListComponent } from "../../venue-module/venue-home/venue-list/venue-list.component"


export const ArtistLayoutRoutes: Routes = [
   
    { path: 'artist',   component:ArtistComponent },
    { path:'artist-calendar', component:ArtistCalendarComponent},
    { path:'artist-notification' , component:ArtistNotificationComponent},
    { path:'artist-request' ,component:ArtistRequestComponent},
    { path:'artist-home' ,component:ArtistHomeComponent},
    { path:'venueList' , component:VenueListComponent},
    { path: 'venueProfile',component:VenueProfileComponent },
    { path: 'venue-reservation-form', component:VenueReservationFormComponent}
   
];
