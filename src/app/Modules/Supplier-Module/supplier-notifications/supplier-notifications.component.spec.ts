import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierNotificationsComponent } from './supplier-notifications.component';

describe('SupplierNotificationsComponent', () => {
  let component: SupplierNotificationsComponent;
  let fixture: ComponentFixture<SupplierNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
