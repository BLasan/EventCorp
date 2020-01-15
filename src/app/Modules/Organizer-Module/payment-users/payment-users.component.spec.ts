import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUsersComponent } from './payment-users.component';

describe('PaymentUsersComponent', () => {
  let component: PaymentUsersComponent;
  let fixture: ComponentFixture<PaymentUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
