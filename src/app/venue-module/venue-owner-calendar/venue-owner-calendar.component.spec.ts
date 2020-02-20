import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueOwnerCalendarComponent } from './venue-owner-calendar.component';

describe('VenueOwnerCalendarComponent', () => {
  let component: VenueOwnerCalendarComponent;
  let fixture: ComponentFixture<VenueOwnerCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueOwnerCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueOwnerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
