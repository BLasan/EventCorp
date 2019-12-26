import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AdminNotificationsComponent } from './admin-notifications.component';
import { MatFormFieldModule } from '@angular/material';

describe('AdminNotificationsComponent', () => {
  let component: AdminNotificationsComponent;
  let fixture: ComponentFixture<AdminNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatFormFieldModule
      ],
      declarations: [ AdminNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
