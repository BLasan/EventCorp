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
import { FormComponent } from './form/form.component';
import { ArtistLayoutComponent } from './layouts/artist-layout/artist-layout.component';
import { CustomerLayoutComponent} from './layouts/customer-layout/customer-layout.component';
import { LocationOwnerLayoutComponent } from './layouts/location-owner-layout/location-owner-layout.component';
import { SupplierLayoutComponent } from './layouts/supplier-layout/supplier-layout.component';
import { OrganizerLayoutComponent } from './layouts/organizer-layout/organizer-layout.component';
// import { VenueProfileComponent } from './venue-profile/venue-profile.component';
import { VenueCalendarComponent } from './venue-module/venue-calendar/venue-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';



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
    FullCalendarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FormComponent,
    ArtistLayoutComponent,
    CustomerLayoutComponent,
    LocationOwnerLayoutComponent,
    SupplierLayoutComponent,
    OrganizerLayoutComponent,
    // VenueProfileComponent,
    VenueCalendarComponent,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
