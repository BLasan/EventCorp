import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MatFormFieldModule, MatButtonModule, MatRippleModule, MatInputModule, MatSelectModule, MatTooltipModule, MatListModule, MatDividerModule, MatIconModule, MatDialogModule, MatRadioModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { AngularFireModule } from '@angular/fire';
import { config } from 'process';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from 'app/components/components.module';
import { AuthGuardAdminService } from 'app/services/Authentication/authGuard_admin.service';
import { AuthGuardArtistService } from 'app/services/Authentication/authGuard_artist.service';
import { AuthGuardOrganizerService } from 'app/services/Authentication/authGuard_organizer.service';
import { AuthGuardSupplierService } from 'app/services/Authentication/athGuard_supplier.service';
import { AuthGuardVenueOwnerService } from 'app/services/Authentication/authGuard_venueOwner.service';
import { ChatService } from 'app/services/chat.service';
import { AuthGuardCustomerService } from 'app/services/Authentication/authGuard_customer.service';
import { VenueHomeService } from 'app/venue-module/venue-home/venue-home.service';
import { VenueProfileResolver } from 'app/venue-profile/venue-profile.resolver';
import { AuthGuardModeratorService } from 'app/services/Authentication/authGuard_moderator.service';
import { AuthGuardPaymentService } from 'app/services/Authentication/authGuard_payment.service';
import { AuthGuardLocationService } from 'app/services/Authentication/authGuardLocation.service';
import { CookieService } from 'angular2-cookie';
import { RouterModule } from '@angular/router';
import { CustomerNavbarModule } from 'app/customer-components/customer-navbar/customer-navbar.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const config={
    apiKey: "AIzaSyCTIdcY84n5a6HJgMAPInQxWKialEj1bNk",
    authDomain: "eventcorpdeployed.firebaseapp.com",
    databaseURL: "https://eventcorpdeployed.firebaseio.com",
    projectId: "eventcorpdeployed",
    storageBucket: "eventcorpdeployed.appspot.com",
    messagingSenderId: "821531422676",
    appId: "1:821531422676:web:5eef3779cb652386eb3041",
    measurementId: "G-XQCHRW0GY4"
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatListModule,
        MatDialogModule,
        MatRadioModule,
        MatDividerModule,
        SharedComponentsModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule.enablePersistence(), // firestore-persistance mode
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        FullCalendarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ComponentsModule,
        MatIconModule,
        RouterModule,
        CustomerNavbarModule,
      ],
      declarations:[
        DashboardComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [AuthGuardAdminService,AuthGuardArtistService,AuthGuardOrganizerService,AuthGuardSupplierService,AuthGuardVenueOwnerService,ChatService,AuthGuardCustomerService,VenueHomeService,VenueProfileResolver,AuthGuardModeratorService,AuthGuardPaymentService,AuthGuardLocationService,CookieService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
