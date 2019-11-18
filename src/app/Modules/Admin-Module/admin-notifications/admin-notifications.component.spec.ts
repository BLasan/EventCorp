import { async, ComponentFixture, TestBed } from '@angular/core/testing';

src/app/Modules/Admin-Module/admin-notifications/admin-notifications.component.spec.ts

import { AdminNotificationsComponent } from './admin-notifications.component';

describe('NotificationsComponent', () => {
  let component: AdminNotificationsComponent;
  let fixture: ComponentFixture<AdminNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotificationsComponent ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD
<<<<<<< HEAD:src/app/Modules/Admin-Module/admin-notifications/admin-notifications.component.spec.ts
    fixture = TestBed.createComponent(AdminNotificationsComponent);
=======
    fixture = TestBed.createComponent(NotificationsComponent);
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/shared-components/notifications/notifications.component.spec.ts
=======
    fixture = TestBed.createComponent(AdminNotificationsComponent);
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
