import { Routes } from '@angular/router';

import { DashboardComponent } from '../../Modules/Admin-Module/dashboard/dashboard.component';
import { UserProfileComponent } from '../../Modules/Admin-Module/user-profile/user-profile.component';
import { TableListComponent } from '../../Modules/Admin-Module/table-list/table-list.component';
import { TypographyComponent } from '../../Modules/Admin-Module/typography/typography.component';
import { MapsComponent } from '../../Modules/Admin-Module/maps/maps.component';
import { IconsComponent } from '../../Modules/Admin-Module/icons/icons.component';
import { AdminNotificationsComponent } from '../../Modules/Admin-Module/admin-notifications/admin-notifications.component';
import { UpgradeComponent } from '../../Modules/Admin-Module/upgrade/upgrade.component';
import { AddNewModeratorsComponent } from 'app/Modules/Admin-Module/add-new-moderators/add-new-moderators.component';

export const AdminLayoutRoutes: Routes = [
   
    { path: 'admin-dashboard',      component: DashboardComponent },
    { path: 'admin-profile',   component: UserProfileComponent },
    { path: 'user-details',     component: TableListComponent },
    { path:'add-new-moderator', component:AddNewModeratorsComponent},
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'admin-notifications',  component: AdminNotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    // { path:'view-events' , component:ViewUserEventsComponent},
];
