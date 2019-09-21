import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerNotificationsComponent } from './organizer-notifications.component';

describe('OrganizerNotificationsComponent', () => {
  let component: OrganizerNotificationsComponent;
  let fixture: ComponentFixture<OrganizerNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
