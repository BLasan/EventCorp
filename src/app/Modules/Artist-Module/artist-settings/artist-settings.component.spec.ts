import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSettingsComponent } from './artist-settings.component';

describe('ArtistSettingsComponent', () => {
  let component: ArtistSettingsComponent;
  let fixture: ComponentFixture<ArtistSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
