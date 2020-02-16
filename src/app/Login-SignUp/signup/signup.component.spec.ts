import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule, MatCardModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { config } from 'process';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
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
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatCheckboxModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule.enablePersistence(), // firestore-persistance mode
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        FullCalendarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NotifierModule,
        MatCheckboxModule,
      ],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
