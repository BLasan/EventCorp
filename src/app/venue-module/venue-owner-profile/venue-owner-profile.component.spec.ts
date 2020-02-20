import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueOwnerProfileComponent } from './venue-owner-profile.component';

describe('VenueOwnerProfileComponent', () => {
  let component: VenueOwnerProfileComponent;
  let fixture: ComponentFixture<VenueOwnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueOwnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
