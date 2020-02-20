import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueNotificationsComponent } from './venue-notifications.component';

describe('VenueNotificationsComponent', () => {
  let component: VenueNotificationsComponent;
  let fixture: ComponentFixture<VenueNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
