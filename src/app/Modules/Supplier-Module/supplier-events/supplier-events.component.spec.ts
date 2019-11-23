import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEventsComponent } from './supplier-events.component';

describe('SupplierEventsComponent', () => {
  let component: SupplierEventsComponent;
  let fixture: ComponentFixture<SupplierEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
