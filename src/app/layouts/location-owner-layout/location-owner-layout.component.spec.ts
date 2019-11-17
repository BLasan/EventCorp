import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationOwnerLayoutComponent } from './location-owner-layout.component';
import { LocationOwnerLayoutModule } from './location-owner-layout.module';

describe('LocationOwnerLayoutComponent', () => {
  let component: LocationOwnerLayoutComponent;
  let fixture: ComponentFixture<LocationOwnerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationOwnerLayoutModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationOwnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
