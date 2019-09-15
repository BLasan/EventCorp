import { Routes } from '@angular/router';
import { OrganizerHomeComponent } from '../../Modules/Organizer-Module/organizer-home/organizer-home.component';
import { OrganizerEventsComponent } from 'app/Modules/Organizer-Module/organizer-events/organizer-events.component';
import { OrganizerProfileComponent } from 'app/Modules/Organizer-Module/organizer-profile/organizer-profile.component';
import { OrganizerNotificationsComponent } from 'app/Modules/Organizer-Module/organizer-notifications/organizer-notifications.component';
import { OrganizerSettingsComponent } from 'app/Modules/Organizer-Module/organizer-settings/organizer-settings.component';
import { RatingSystemComponent } from 'app/shared-components/rating-system/rating-system.component';


export const OrganizerLayoutRoutes: Routes = [
    
    { path:'organizer-home',component:OrganizerHomeComponent },
    { path:'organizer-events',component:OrganizerEventsComponent},
    { path:'organizer-profile',component:OrganizerProfileComponent},
    { path:'organizer-notification',component:OrganizerNotificationsComponent},
    { path:'organizer-settings',component:OrganizerSettingsComponent},
    { path:'ratings/:token',component:RatingSystemComponent},
];
