import { Routes } from '@angular/router';
import { ModeratorDashboardComponent } from 'app/Modules/Moderator-Module/moderator-dashboard/moderator-dashboard.component';
import { ModeratorNotificationsComponent } from 'app/Modules/Moderator-Module/moderator-notifications/moderator-notifications.component';
import { ReportWarningsComponent } from 'app/Modules/Moderator-Module/report-warnings/report-warnings.component';
import { ModeratorSettingsComponent } from 'app/Modules/Moderator-Module/moderator-settings/moderator-settings.component';


export const ModeratorLayoutRoutes: Routes = [
    
    { path: 'moderator-dashboard', component:ModeratorDashboardComponent},
    { path: 'moderator-notifications' , component:ModeratorNotificationsComponent},
    { path: 'report-warnings' , component:ReportWarningsComponent},
    { path: 'moderator-settings' , component:ModeratorSettingsComponent}
];
