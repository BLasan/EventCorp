import { Routes } from '@angular/router';

import { DashboardComponent } from '../../Modules/Admin-Module/dashboard/dashboard.component';
import { UserProfileComponent } from '../../Modules/Admin-Module/user-profile/user-profile.component';
import { TableListComponent } from '../../Modules/Admin-Module/table-list/table-list.component';
import { TypographyComponent } from '../../Modules/Admin-Module/typography/typography.component';
import { MapsComponent } from '../../Modules/Admin-Module/maps/maps.component';
import { IconsComponent } from '../../Modules/Admin-Module/icons/icons.component';
import { NotificationsComponent } from '../../Modules/Admin-Module/notifications/notifications.component';
import { UpgradeComponent } from '../../Modules/Admin-Module/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
   
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
