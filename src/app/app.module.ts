import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { NgAlertModule } from '@theo4u/ng-alert';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormComponent } from './Modules/Admin-Module/form/form.component';
import { ArtistLayoutComponent } from './layouts/artist-layout/artist-layout.component';
import { CustomerLayoutComponent} from './layouts/customer-layout/customer-layout.component';
import { LocationOwnerLayoutComponent } from './layouts/location-owner-layout/location-owner-layout.component';
import { SupplierLayoutComponent } from './layouts/supplier-layout/supplier-layout.component';
import { OrganizerLayoutComponent } from './layouts/organizer-layout/organizer-layout.component';
import { PaypalPaymentComponent } from './Modules/paypal-payment/paypal-payment.component';
import { ViewBookingInfoComponent } from './Modules/Artist-Module/view-booking-info/view-booking-info.component';
import { RatingSystemComponent } from './Modules/rating-system/rating-system.component';
import { SearchUserComponent } from './Modules/search-user/search-user.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    NgAlertModule,
    ReactiveFormsModule,
    //HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    // FormComponent,
    ArtistLayoutComponent,
    SearchUserComponent,
    // CustomerLayoutComponent,
    // LocationOwnerLayoutComponent,
    // SupplierLayoutComponent,
    // OrganizerLayoutComponent,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
