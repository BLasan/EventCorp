import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingInfoComponent } from './view-booking-info.component';

describe('ViewBookingInfoComponent', () => {
  let component: ViewBookingInfoComponent;
  let fixture: ComponentFixture<ViewBookingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBookingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBookingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
