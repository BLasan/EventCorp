import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAddItemsComponent } from './supplier-add-items.component';

describe('SupplierAddItemsComponent', () => {
  let component: SupplierAddItemsComponent;
  let fixture: ComponentFixture<SupplierAddItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierAddItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
