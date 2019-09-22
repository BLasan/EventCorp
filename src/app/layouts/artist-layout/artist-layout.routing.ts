import { Routes } from '@angular/router';
import { ArtistComponent } from '../../Modules/Artist-Module/artist/artist.component';
import { ArtistCalendarComponent } from '../../Modules/Artist-Module/artist-calendar/artist-calendar.component';
import { ArtistNotificationComponent } from '../../Modules/Artist-Module/artist-notification/artist-notification.component';
import { ArtistRequestComponent } from '../../Modules/Artist-Module/artist-request/artist-request.component';
import { ArtistHomeComponent } from '../../Modules/Artist-Module/artist-home/artist-home.component';
import { PaypalPaymentComponent } from 'app/Modules/paypal-payment/paypal-payment.component';
import { ViewBookingInfoComponent } from 'app/Modules/Artist-Module/view-booking-info/view-booking-info.component';
import { RatingSystemComponent } from 'app/Modules/rating-system/rating-system.component';
import { NotificationsComponent } from 'app/shared-components/notifications/notifications.component';

export const ArtistLayoutRoutes: Routes = [
   
    { path: 'artist',   component:ArtistComponent },
    { path:'artist-calendar', component:ArtistCalendarComponent},
    { path:'notifications' , component:ArtistNotificationComponent},
    { path:'artist-request' ,component:ArtistRequestComponent},
    { path:'artist-home' ,component:ArtistHomeComponent},
    { path:'view_booking_info' ,component:ViewBookingInfoComponent}
];
