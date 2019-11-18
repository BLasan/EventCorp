<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistHomeComponent } from './artist-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatCardModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatIconModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
=======
<<<<<<< HEAD:src/app/Modules/email-verify/email-verify.component.spec.ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifyComponent } from './email-verify.component';

describe('EmailVerifyComponent', () => {
  let component: EmailVerifyComponent;
  let fixture: ComponentFixture<EmailVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistHomeComponent } from './artist-home.component';
>>>>>>> af05326492d9b3a8f847cbc07022301514769862

describe('ArtistHomeComponent', () => {
  let component: ArtistHomeComponent;
  let fixture: ComponentFixture<ArtistHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
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
        MatIconModule,
        NgbModule,
        SharedComponentsModule,
      ],
=======
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
      declarations: [ ArtistHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
<<<<<<< HEAD
=======
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/Modules/Artist-Module/artist-home/artist-home.component.spec.ts
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
