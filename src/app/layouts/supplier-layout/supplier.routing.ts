import { Routes } from '@angular/router';
import { SupplierHomeComponent } from 'app/Modules/Supplier-Module/supplier-home/supplier-home.component';
import { SupplierEventsComponent } from 'app/Modules/Supplier-Module/supplier-events/supplier-events.component';
import { SupplierNotificationsComponent } from 'app/Modules/Supplier-Module/supplier-notifications/supplier-notifications.component';
import { SupplierProfileComponent } from 'app/Modules/Supplier-Module/supplier-profile/supplier-profile.component';
import { SupplierSettingsComponent } from 'app/Modules/Supplier-Module/supplier-settings/supplier-settings.component';
import { RatingSystemComponent } from 'app/shared-components/rating-system/rating-system.component';
import { MyChatsComponent } from '../../shared-components/my-chats/my-chats.component';

export const SupplierLayoutRoutes: Routes = [
    {path:'supplier-home',component:SupplierHomeComponent},
    {path:'supplier-events',component:SupplierEventsComponent},
    {path:'supplier-notifications',component:SupplierNotificationsComponent},
    {path:'supplier-profile',component:SupplierProfileComponent},
    {path:'my-chat-list',component:MyChatsComponent},
    {path:'supplier-settings',component:SupplierSettingsComponent},
    {path:'ratings/:name' , component:RatingSystemComponent}, 
];