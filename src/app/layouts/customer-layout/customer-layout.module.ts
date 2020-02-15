import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CustomerLayoutRoutes} from './customer-layout.routing';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatListModule
  } from '@angular/material';

import { from } from 'rxjs';
import { CustomerHomeComponent } from '../../Modules/Customer-Module/customer-home/customer-home.component';
import { AppComponent } from 'app/app.component';
import { HomePageComponent } from 'app/Modules/home-page/home-page.component';
import { HomePageComponentModule } from 'app/Modules/home-page/home-page.module';
import { AboutUsComponent } from 'app/Modules/Customer-Module/about-us/about-us.component';
import { FaqComponent } from 'app/Modules/Customer-Module/faq/faq.component';
import { ContactUsComponent } from 'app/Modules/Customer-Module/contact-us/contact-us.component';
import { FeedbackComponent } from 'app/Modules/Customer-Module/feedback/feedback.component';
import { MatCarouselModule, MatCarouselComponent, MatCarouselSlideComponent } from '@ngmodule/material-carousel';
import { HelpComponent } from 'app/shared-components/help/help.component';
import { LatestEventsComponent } from 'app/Modules/Customer-Module/latest-events/latest-events.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ShowArtistComponent} from 'app/Modules/Customer-Module/show-artist/show-artist.component';
import { SearchArtistPipe } from 'app/Modules/Customer-Module/searchArtist.pipe';
import { ShowProvidersComponent } from 'app/Modules/Customer-Module/show-providers/show-providers.component';
import { SearchProviderPipe } from 'app/Modules/Customer-Module/searchProvider.pipe';
import { ShowVenueComponent } from 'app/Modules/Customer-Module/show-venue/show-venue.component';
import { SearchVenuePipe } from 'app/Modules/Customer-Module/searchVenue.pipe';
import { AgmCoreModule } from '@agm/core';

  @NgModule({
    imports: [
      CommonModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAJiTvdCB4__gqcZMTkmLaSZWic94KFCvI'
      }),
      RouterModule.forChild(CustomerLayoutRoutes),
      FormsModule,
      NgbModule,
      MatButtonModule,
      MatRippleModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatTooltipModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatCarouselModule,
      MatSliderModule,
      ReactiveFormsModule,
      NgxMatSelectSearchModule,
      MatListModule,
      // HomePageComponentModule
    ],
    declarations: [
     CustomerHomeComponent,
     AboutUsComponent,
     FaqComponent,
     ContactUsComponent,
     FeedbackComponent,
     HelpComponent,
     LatestEventsComponent,
     ShowArtistComponent,
     SearchArtistPipe,
     ShowProvidersComponent,
     SearchProviderPipe,
     ShowVenueComponent,
     SearchVenuePipe,
     //ShowProvidersComponent,
    //  MatCarouselComponent,
    //  MatCarouselSlideComponent
    ],
  })
  
  export class CustomerLayoutModule {}
  
