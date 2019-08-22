import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueReservationFormComponent } from './venue-reservation-form.component';

describe('VenueReservationFormComponent', () => {
  let component: VenueReservationFormComponent;
  let fixture: ComponentFixture<VenueReservationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueReservationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
