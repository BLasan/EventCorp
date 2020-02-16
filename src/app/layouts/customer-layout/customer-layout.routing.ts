import { Routes } from '@angular/router';
import { CustomerHomeComponent } from '../../Modules/Customer-Module/customer-home/customer-home.component';
import { ContactUsComponent } from '../../Modules/Customer-Module/contact-us/contact-us.component';
import { AboutUsComponent } from '../../Modules/Customer-Module/about-us/about-us.component';
import { FaqComponent } from '../../Modules/Customer-Module/faq/faq.component';
import { FeedbackComponent } from '../../Modules/Customer-Module/feedback/feedback.component';
import { HelpComponent } from 'app/shared-components/help/help.component';
import { LatestEventsComponent } from 'app/Modules/Customer-Module/latest-events/latest-events.component';
import { ShowArtistComponent} from 'app/Modules/Customer-Module/show-artist/show-artist.component';
import { ShowProvidersComponent } from 'app/Modules/Customer-Module/show-providers/show-providers.component';
import { ShowVenueComponent } from 'app/Modules/Customer-Module/show-venue/show-venue.component';

export const CustomerLayoutRoutes: Routes = [
    
    { path: 'home', component:CustomerHomeComponent },
    { path: 'upcomming-events', component:LatestEventsComponent },
    { path: 'contact-us' , component:ContactUsComponent},
    { path: 'about-us' , component:AboutUsComponent},
    // { path: 'faq' , component:FaqComponent},
    // { path: 'feedback' , component:FeedbackComponent},
    { path: 'help' , component:HelpComponent},
    { path: 'show-artists' , component:ShowArtistComponent},
    { path: 'show-providers' , component:ShowProvidersComponent},
    { path: 'show-venue' , component:ShowVenueComponent}
    // { path:'enter-email-reset-password',component:ResetPasswordComponent},
    // { path:'password-update/:uid/email',component:ResetPasswordFirebaseComponent},
];
