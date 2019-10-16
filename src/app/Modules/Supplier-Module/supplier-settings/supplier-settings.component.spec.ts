import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierSettingsComponent } from './supplier-settings.component';

describe('SupplierSettingsComponent', () => {
  let component: SupplierSettingsComponent;
  let fixture: ComponentFixture<SupplierSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
