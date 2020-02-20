import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule , NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from 'ng-fullcalendar';
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
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { MyChatsComponent } from 'app/shared-components/my-chats/my-chats.component';
import { OnlineChatComponent } from 'app/Modules/online-chat/online-chat.component';
import { OnlineChatModule } from 'app/Modules/online-chat/online-chat.module';
import { SupplierAddItemsComponent } from 'app/Modules/Supplier-Module/supplier-add-items/supplier-add-items.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ViewAllProductsComponent } from 'app/Modules/Supplier-Module/view-all-products/view-all-products.component';
import { SearchItemsPipe } from 'app/Modules/Supplier-Module/searchItems.pipe';
import { EditProductsComponent } from 'app/Modules/Supplier-Module/edit-products/edit-products.component';
import { SupplierProductsTableComponent } from 'app/Modules/Supplier-Module/supplier-products-table/supplier-products-table.component';
import { BookedEventsComponent } from 'app/shared-components/booked-events/booked-events.component';
import { SearchBookedEventsPipe } from 'app/shared-components/searchBookedEvents.pipe';
import { UserLocationComponent } from 'app/shared-components/user-location/user-location.component';
import { MapsComponent } from 'app/Modules/Supplier-Module/maps/maps.component';

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
      SharedComponentsModule,
      MatCarouselModule
    ],
    declarations: [
      SupplierHomeComponent,
      SupplierNotificationsComponent,
      SupplierProfileComponent,
      SupplierSettingsComponent,
      SupplierEventsComponent,
      SupplierAddItemsComponent,
      EditProductsComponent,
      SupplierProductsTableComponent,
      MapsComponent
      // BookedEventsComponent,
      // SearchBookedEventsPipe
      // ViewAllProductsComponent,
      // SearchItemsPipe
     // MyChatsComponent,
      // CalendarComponent
    ],
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
export class SupplierLayoutModule { }
