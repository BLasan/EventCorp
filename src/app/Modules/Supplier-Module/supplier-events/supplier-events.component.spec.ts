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

describe('ArtistCalendarComponent', () => {
  let component: ArtistCalendarComponent;
  let fixture: ComponentFixture<ArtistCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/Modules/Artist-Module/artist-calendar/artist-calendar.component.spec.ts
