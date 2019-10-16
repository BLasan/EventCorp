import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierHomeComponent } from './supplier-home.component';

describe('SupplierHomeComponent', () => {
  let component: SupplierHomeComponent;
  let fixture: ComponentFixture<SupplierHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
