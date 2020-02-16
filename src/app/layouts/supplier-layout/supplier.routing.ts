import { Routes } from '@angular/router';
import { SupplierHomeComponent } from 'app/Modules/Supplier-Module/supplier-home/supplier-home.component';
import { SupplierEventsComponent } from 'app/Modules/Supplier-Module/supplier-events/supplier-events.component';
import { SupplierNotificationsComponent } from 'app/Modules/Supplier-Module/supplier-notifications/supplier-notifications.component';
import { SupplierProfileComponent } from 'app/Modules/Supplier-Module/supplier-profile/supplier-profile.component';
import { SupplierSettingsComponent } from 'app/Modules/Supplier-Module/supplier-settings/supplier-settings.component';
import { RatingSystemComponent } from 'app/shared-components/rating-system/rating-system.component';
import { MyChatsComponent } from '../../shared-components/my-chats/my-chats.component';
import { SupplierAddItemsComponent } from 'app/Modules/Supplier-Module/supplier-add-items/supplier-add-items.component';
import { ViewAllProductsComponent } from 'app/Modules/Supplier-Module/view-all-products/view-all-products.component';
import { EditProductsComponent } from 'app/Modules/Supplier-Module/edit-products/edit-products.component';
import { SupplierProductsTableComponent } from 'app/Modules/Supplier-Module/supplier-products-table/supplier-products-table.component';
import { BookedEventsComponent } from 'app/shared-components/booked-events/booked-events.component';
import { UserLocationComponent } from 'app/shared-components/user-location/user-location.component';
import { MapsComponent } from 'app/Modules/Supplier-Module/maps/maps.component';

export const SupplierLayoutRoutes: Routes = [
    {path:'supplier-home',component:SupplierHomeComponent},
    {path:'supplier-events',component:SupplierEventsComponent},
    {path:'supplier-notifications',component:SupplierNotificationsComponent},
    {path:'supplier-profile',component:SupplierProfileComponent},
    {path:'my-chat-list',component:MyChatsComponent},
    {path:'supplier-settings',component:SupplierSettingsComponent},
    {path:'ratings/:name' , component:RatingSystemComponent}, 
    {path:'supplier-add-items',component:SupplierAddItemsComponent},
    {path:'edit-product/:id',component:EditProductsComponent},
    {path:'supplier-products',component:SupplierProductsTableComponent},
    {path:"supplier-booked_events",component:BookedEventsComponent},
    {path: 'supplier-maps' , component:MapsComponent}
    // {path:'view-events/:uid' , component:ViewUserEventsComponent},
];