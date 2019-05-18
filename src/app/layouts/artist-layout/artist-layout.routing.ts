import { Routes } from '@angular/router';
import { ArtistComponent } from 'app/Artist-Module/artist/artist.component';
import { ArtistCalendarComponent } from 'app/Artist-Module/artist-calendar/artist-calendar.component';
import { ArtistNotificationComponent } from 'app/Artist-Module/artist-notification/artist-notification.component';
import { ArtistRequestComponent } from 'app/Artist-Module/artist-request/artist-request.component';
import { ArtistHomeComponent } from 'app/Artist-Module/artist-home/artist-home.component';

export const ArtistLayoutRoutes: Routes = [
   
    { path: 'artist',   component:ArtistComponent },
    { path:'artist-calendar', component:ArtistCalendarComponent},
    { path:'artist-notification' , component:ArtistNotificationComponent},
    { path:'artist-request' ,component:ArtistRequestComponent},
    { path:'artist-home' ,component:ArtistHomeComponent}
   
];
