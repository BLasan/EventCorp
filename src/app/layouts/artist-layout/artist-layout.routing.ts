import { Routes } from '@angular/router';
import { ArtistComponent } from '../../Modules/Artist-Module/artist/artist.component';
import { ArtistCalendarComponent } from '../../Modules/Artist-Module/artist-calendar/artist-calendar.component';
import { ArtistNotificationComponent } from '../../Modules/Artist-Module/artist-notification/artist-notification.component';
import { ArtistRequestComponent } from '../../Modules/Artist-Module/artist-request/artist-request.component';
import { ArtistHomeComponent } from '../../Modules/Artist-Module/artist-home/artist-home.component';
import { PaypalPaymentComponent } from 'app/Modules/paypal-payment/paypal-payment.component';
import { ViewBookingInfoComponent } from 'app/Modules/Artist-Module/view-booking-info/view-booking-info.component';
import { RatingSystemComponent } from '../../shared-components/rating-system/rating-system.component';
import { NotificationsComponent } from 'app/shared-components/notifications/notifications.component';
import { MyChatsComponent } from '../../shared-components/my-chats/my-chats.component';
import { ArtistSettingsComponent } from 'app/Modules/Artist-Module/artist-settings/artist-settings.component';
import { AddPlaylistComponent } from 'app/Modules/Artist-Module/add-playlist/add-playlist.component';
import { EditPlaylistComponent } from 'app/Modules/Artist-Module/edit-playlist/edit-playlist.component';
import { BookedEventsComponent } from 'app/shared-components/booked-events/booked-events.component';
import { UserLocationComponent } from 'app/shared-components/user-location/user-location.component';

export const ArtistLayoutRoutes: Routes = [
   
    { path: 'artist-profile',   component:ArtistComponent },
    { path:'artist-calendar', component:ArtistCalendarComponent},
    { path:'artist-notifications' , component:ArtistRequestComponent},
    { path:'artist-home' ,component:ArtistHomeComponent},
    { path:'add-playlist' ,component:AddPlaylistComponent},
    { path:'view_booking_info' ,component:ViewBookingInfoComponent},
    { path:'my-chat-list',component:MyChatsComponent},
    { path:'artist-settings' , component:ArtistSettingsComponent},
    { path:'ratings/:name' , component:RatingSystemComponent}, 
    // { path:"Edit Playlist/:id",component:EditPlaylistComponent},
    { path:'booked_events',component:BookedEventsComponent},
    { path: 'maps' , component:UserLocationComponent}
];
