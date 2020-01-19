import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductsTableComponent } from './supplier-products-table.component';

describe('SupplierProductsTableComponent', () => {
  let component: SupplierProductsTableComponent;
  let fixture: ComponentFixture<SupplierProductsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierProductsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
