import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorNotificationsComponent } from './moderator-notifications.component';

describe('ModeratorNotificationsComponent', () => {
  let component: ModeratorNotificationsComponent;
  let fixture: ComponentFixture<ModeratorNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
