import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule , NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
  } from '@angular/material';
import { SupplierLayoutRoutes } from './supplier.routing';
import { SupplierHomeComponent } from 'app/Modules/Supplier-Module/supplier-home/supplier-home.component';
import { SupplierNotificationsComponent } from 'app/Modules/Supplier-Module/supplier-notifications/supplier-notifications.component';
import { SupplierProfileComponent } from 'app/Modules/Supplier-Module/supplier-profile/supplier-profile.component';
import { SupplierSettingsComponent } from 'app/Modules/Supplier-Module/supplier-settings/supplier-settings.component';
import { SupplierEventsComponent } from 'app/Modules/Supplier-Module/supplier-events/supplier-events.component';

  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(SupplierLayoutRoutes),
      FormsModule,
      MatButtonModule,
      MatRippleModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatTooltipModule,
      MatCardModule,
      MatListModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      MatSliderModule,
      NgbModule,
      MatAutocompleteModule,
      MatButtonToggleModule,
      MatCheckboxModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatMenuModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatSidenavModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatStepperModule,
      MatListModule,
     
    ],
    declarations: [
      SupplierHomeComponent,
      SupplierNotificationsComponent,
      SupplierProfileComponent,
      SupplierSettingsComponent,
      SupplierEventsComponent
    ],
   
  })
export class SupplierLayoutModule { }
