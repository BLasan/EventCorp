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
import { EventsAddComponent } from 'app/Modules/Organizer-Module/organizer-events/events-add/events-add.component';


export const OrganizerLayoutRoutes: Routes = [
    
    { path:'organizer-home',component:OrganizerHomeComponent },
    { path:'organizer-events',component:OrganizerEventsComponent},
    { path:'organizer-profile',component:OrganizerProfileComponent},
    { path:'organizer-notifications',component:OrganizerNotificationsComponent},
    { path:'organizer-settings',component:OrganizerSettingsComponent},
    { path:'ratings/:name' , component:RatingSystemComponent}, 
    { path:'payment-bill' , component:PaymentBillComponent},
    {path:'view-all-products',component:ViewAllProductsComponent},
    {path:'view-request-status',component:ViewRequestStatusComponent},
    { path:'add-events' , component:EventsAddComponent}
];
