import { Routes } from '@angular/router';
import { CustomerHomeComponent } from '../../Modules/Customer-Module/customer-home/customer-home.component';
import { ContactUsComponent } from 'app/Modules/Customer-Module/contact-us/contact-us.component';
import { AboutUsComponent } from 'app/Modules/Customer-Module/about-us/about-us.component';
import { FaqComponent } from 'app/Modules/Customer-Module/faq/faq.component';


export const CustomerLayoutRoutes: Routes = [
    
    { path: 'home', component:CustomerHomeComponent },
    { path: 'contact-us' , component:ContactUsComponent},
    { path: 'about-us' , component:AboutUsComponent},
    { path: 'faq' , component:FaqComponent}
];
