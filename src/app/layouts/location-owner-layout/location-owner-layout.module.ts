import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LocationOwnerLayoutRoutes } from "./location_owner.routing";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';


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
  MatChipsModule
  // MatTableModule
} from "@angular/material";

import { VenueListComponent } from "../../venue-module/venue-home/venue-list/venue-list.component";
import { VenueProfileComponent } from "../../venue-profile/venue-profile.component";
import { VenueReservationFormComponent } from "../../venue-module/venue-reservation-form/venue-reservation-form.component";
import { VenueAddComponent } from "../../venue-module/venue-home/venue-add/venue-add.component";
import { SharedComponentsModule } from "app/shared-components/shared-components.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { ViewBookingInfoComponent } from "app/Modules/Artist-Module/view-booking-info/view-booking-info.component";

import { from } from "rxjs";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LocationOwnerLayoutRoutes),
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
    MatSliderModule
  ],
  declarations: [
    VenueListComponent,
    VenueProfileComponent,
    VenueReservationFormComponent,
    VenueAddComponent
  ]
})
export class LocationOwnerLayoutModule {}
