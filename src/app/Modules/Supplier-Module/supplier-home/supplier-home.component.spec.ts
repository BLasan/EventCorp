import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierHomeComponent } from './supplier-home.component';
import { MatFormFieldModule, MatButtonModule, MatRippleModule, MatInputModule, MatSelectModule, MatTooltipModule, MatListModule, MatDividerModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatSliderModule, MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatStepperModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProductsComponent } from '../edit-products/edit-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCarouselModule } from '@ngmodule/material-carousel';

describe('SupplierHomeComponent', () => {
  let component: SupplierHomeComponent;
  let fixture: ComponentFixture<SupplierHomeComponent>;
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
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatListModule,
        MatCardModule,
        MatDividerModule,
        RouterModule.forRoot([]),
        SharedComponentsModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule.enablePersistence(), // firestore-persistance mode
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        FullCalendarModule,
        HttpClientModule,
        BrowserAnimationsModule,
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
        MatCarouselModule

      ],
      declarations: [ SupplierHomeComponent ],
     
    })
    .compileComponents();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierHomeComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //reset image
  it('should create', () => {
    component.get_product_items();
    expect(component.load_items).toBe("loaded");
  });

});

