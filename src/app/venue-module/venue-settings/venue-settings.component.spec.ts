import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSettingsComponent } from './venue-settings.component';

describe('VenueSettingsComponent', () => {
  let component: VenueSettingsComponent;
  let fixture: ComponentFixture<VenueSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
