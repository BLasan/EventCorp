<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCalendarComponent } from './artist-calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatCardModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatIconModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
=======
<<<<<<< HEAD:src/app/Modules/Supplier-Module/supplier-events/supplier-events.component.spec.ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEventsComponent } from './supplier-events.component';

describe('SupplierEventsComponent', () => {
  let component: SupplierEventsComponent;
  let fixture: ComponentFixture<SupplierEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCalendarComponent } from './artist-calendar.component';
>>>>>>> af05326492d9b3a8f847cbc07022301514769862

describe('ArtistCalendarComponent', () => {
  let component: ArtistCalendarComponent;
  let fixture: ComponentFixture<ArtistCalendarComponent>;

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
      declarations: [ ArtistCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
<<<<<<< HEAD
=======
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/Modules/Artist-Module/artist-calendar/artist-calendar.component.spec.ts
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
