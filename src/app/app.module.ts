import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import {CommonModule} from '@angular/common';
import { NgAlertModule } from '@theo4u/ng-alert';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {IssuesService} from './issues.service';
import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee.service';
import { PusherService } from './services/pusher.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ArtistComponent } from './Artist-Module/artist/artist.component';
import { ArtistLayoutComponent } from './layouts/artist-layout/artist-layout.component';
import { TestComponent } from './test/test.component';
import { ArtistCalendarComponent } from './Artist-Module/artist-calendar/artist-calendar.component';
import { ArtistNotificationComponent } from './Artist-Module/artist-notification/artist-notification.component';
import { ArtistRequestComponent } from './Artist-Module/artist-request/artist-request.component';
import { ArtistHomeComponent } from './Artist-Module/artist-home/artist-home.component';


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
   
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListEmployeeComponent,
    CreateEmployeeComponent,
    FormComponent,
    ArtistLayoutComponent,
    TestComponent,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
