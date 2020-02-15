import { Routes } from '@angular/router';
import { OrganizerHomeComponent } from '../../Modules/Organizer-Module/organizer-home/organizer-home.component';
import { OrganizerEventsComponent } from 'app/Modules/Organizer-Module/organizer-events/organizer-events.component';
import { OrganizerProfileComponent } from 'app/Modules/Organizer-Module/organizer-profile/organizer-profile.component';
import { OrganizerNotificationsComponent } from 'app/Modules/Organizer-Module/organizer-notifications/organizer-notifications.component';
import { OrganizerSettingsComponent } from 'app/Modules/Organizer-Module/organizer-settings/organizer-settings.component';
import { RatingSystemComponent } from 'app/shared-components/rating-system/rating-system.component';
import { MyChatsComponent } from 'app/shared-components/my-chats/my-chats.component';
import { PaymentBillComponent } from 'app/Modules/Organizer-Module/payment-bill/payment-bill.component';
import { ViewAllProductsComponent } from 'app/Modules/Supplier-Module/view-all-products/view-all-products.component';
import { ViewRequestStatusComponent } from 'app/Modules/Organizer-Module/view-request-status/view-request-status.component';
import { PaypalPaymentComponent } from 'app/shared-components/paypal-payment/paypal-payment.component';
import { PaymentUsersComponent } from 'app/Modules/Organizer-Module/payment-users/payment-users.component';
import { UpdateEventsComponent } from 'app/Modules/Organizer-Module/update-events/update-events.component';
import { ViewAllEventsComponent } from 'app/Modules/Organizer-Module/view-all-events/view-all-events.component';
import { ViewUserEventsComponent } from 'app/shared-components/view-user-events/view-user-events.component';
import { BookedEventsComponent } from 'app/shared-components/booked-events/booked-events.component';
import { UserLocationComponent } from 'app/shared-components/user-location/user-location.component';


export const OrganizerLayoutRoutes: Routes = [
    
    { path:'organizer-home',component:OrganizerHomeComponent },
    { path:'organizer-events',component:OrganizerEventsComponent},
    { path:'organizer-profile',component:OrganizerProfileComponent},
    { path:'organizer-notifications',component:OrganizerNotificationsComponent},
    { path:'organizer-settings',component:OrganizerSettingsComponent},
    { path:'ratings/:name' , component:RatingSystemComponent}, 
    { path:'payment-bill' , component:PaymentBillComponent},
    { path:'view-all-products',component:ViewAllProductsComponent},
    { path:'view-request-status',component:ViewRequestStatusComponent},
    { path:'update-events/:event_id',component:UpdateEventsComponent},
    { path:'view-all-events',component:ViewAllEventsComponent},
    { path:'booked_events',component:BookedEventsComponent},
    { path: 'maps' , component:UserLocationComponent}
    // { path:'payment/:item_name/:quantity/:amount',component:PaypalPaymentComponent},
    // { path:'user-payments/:user_name/:quantity/:amount',component:PaymentUsersComponent}
];
