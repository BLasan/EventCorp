import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProductsComponent } from './view-all-products.component';
import { MatFormFieldModule, MatButtonModule, MatRippleModule, MatInputModule, MatSelectModule, MatTooltipModule, MatListModule, MatDividerModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { AngularFireModule } from '@angular/fire';
import { config } from 'process';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchItemsPipe } from '../searchItems.pipe';

describe('ViewAllProductsComponent', () => {
  let component: ViewAllProductsComponent;
  let fixture: ComponentFixture<ViewAllProductsComponent>;
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
        MatDividerModule,
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule.enablePersistence(), // firestore-persistance mode
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        FullCalendarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule
      ],
      declarations: [ViewAllProductsComponent,SearchItemsPipe]
    })
    .compileComponents();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllProductsComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
