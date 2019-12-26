import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueCalendarComponent } from './venue-calendar.component';

describe('VenueCalendarComponent', () => {
  let component: VenueCalendarComponent;
  let fixture: ComponentFixture<VenueCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
