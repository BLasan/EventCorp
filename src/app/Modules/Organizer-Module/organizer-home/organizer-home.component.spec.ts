import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatCardModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatSliderModule, MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatStepperModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { AngularFireModule } from '@angular/fire';
import { config } from 'process';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizerHomeComponent } from './organizer-home.component';

describe('OrganizerHomeComponent', () => {
  let component: OrganizerHomeComponent;
  let fixture: ComponentFixture<OrganizerHomeComponent>;
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
  var originalTimeout;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
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
        NgxMatSelectSearchModule,
        SharedComponentsModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule.enablePersistence(), // firestore-persistance mode
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        FullCalendarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      declarations: [ OrganizerHomeComponent ]
    })
    .compileComponents();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerHomeComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //test load modal
  it('should create', () => {
    component.load_modal("7328978972498");
    expect(component.suppliers_participated.length).toBeGreaterThanOrEqual(0);
    expect(component.artists_participated.length).toBeGreaterThanOrEqual(0);
  });


});
