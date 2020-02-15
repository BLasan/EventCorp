import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListComponent } from './table-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatButtonModule, MatRippleModule, MatInputModule, MatSelectModule, MatTooltipModule, MatListModule, MatDialogModule, MatRadioModule, MatDividerModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { CustomerNavbarModule } from 'app/customer-components/customer-navbar/customer-navbar.module';

describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;
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
      providers:[HttpClient],
      declarations: [ TableListComponent ]
    })
    .compileComponents();
  }));

  //test component
  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  //test get users
  it('should create', () => {
    component.getUsers();
    expect(component.isLoading).toBe(true);
  });

    //test recover user
    it('should create', () => {
      component.recover_user("benuraab@gmail.com");
      expect(component.user_profile.length).toBe(0);
    });
  


});
