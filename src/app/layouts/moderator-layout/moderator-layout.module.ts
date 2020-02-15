import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {ModeratorLayoutRoutes} from '../moderator-layout/moderator-layout.routing';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatCardModule,
  MatListModule,
  MatChipsModule,
  // MatTableModule
} from "@angular/material";

import { ModeratorDashboardComponent } from 'app/Modules/Moderator-Module/moderator-dashboard/moderator-dashboard.component';
import { ModeratorNotificationsComponent } from 'app/Modules/Moderator-Module/moderator-notifications/moderator-notifications.component';
import { ModeratorSettingsComponent } from 'app/Modules/Moderator-Module/moderator-settings/moderator-settings.component';
import { ReportWarningsComponent } from 'app/Modules/Moderator-Module/report-warnings/report-warnings.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ModeratorService } from 'app/services/moderator.service';
import { ModeratorQueriesComponent } from 'app/Modules/Moderator-Module/moderator-queries/moderator-queries.component';
import { QueryReplyDialogComponent } from 'app/Modules/Moderator-Module/query-reply-dialog/query-reply-dialog.component';
import { FilterPipe } from 'app/Modules/Moderator-Module/filter.pipe';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ModeratorLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatDatepickerModule,
    MatGridListModule,
    MatIconModule,
    MatSliderModule,
    MatCarouselModule,
  ],
  declarations: [
   ModeratorDashboardComponent,
   ModeratorNotificationsComponent,
   ModeratorSettingsComponent,
   ReportWarningsComponent,
   ModeratorQueriesComponent,
  //  QueryReplyDialogComponent,
   FilterPipe,
  //  BookedEventsComponent
  ],
  providers: [ModeratorService],
  // entryComponents: [QueryReplyDialogComponent]
})
export class ModeratorLayoutModule {}