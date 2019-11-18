import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
<<<<<<< HEAD:src/app/Modules/paypal-payment/paypal-payment.component.spec.ts
=======
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
import { PaypalPaymentComponent } from './paypal-payment.component';

describe('PaypalPaymentComponent', () => {
  let component: PaypalPaymentComponent;
  let fixture: ComponentFixture<PaypalPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalPaymentComponent ]
<<<<<<< HEAD
=======
import { OrganizerHomeComponent } from './organizer-home.component';

describe('OrganizerHomeComponent', () => {
  let component: OrganizerHomeComponent;
  let fixture: ComponentFixture<OrganizerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerHomeComponent ]
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/Modules/Organizer-Module/organizer-home/organizer-home.component.spec.ts
=======
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD
<<<<<<< HEAD:src/app/Modules/paypal-payment/paypal-payment.component.spec.ts
    fixture = TestBed.createComponent(PaypalPaymentComponent);
=======
    fixture = TestBed.createComponent(OrganizerHomeComponent);
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/Modules/Organizer-Module/organizer-home/organizer-home.component.spec.ts
=======
    fixture = TestBed.createComponent(PaypalPaymentComponent);
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
