import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../Modules/Admin-Module/dashboard/dashboard.component';
import { UserProfileComponent } from '../../Modules/Admin-Module/user-profile/user-profile.component';
import { TableListComponent } from '../../Modules/Admin-Module/table-list/table-list.component';
import { TypographyComponent } from '../../Modules/Admin-Module/typography/typography.component';
import { MapsComponent } from '../../Modules/Admin-Module/maps/maps.component';
import { IconsComponent } from '../../Modules/Admin-Module/icons/icons.component';
import { NotificationsComponent } from '../../Modules/Admin-Module/notifications/notifications.component';
import { UpgradeComponent } from '../../Modules/Admin-Module/upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {}
