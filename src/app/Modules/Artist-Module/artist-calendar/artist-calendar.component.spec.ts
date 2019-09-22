import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCalendarComponent } from './artist-calendar.component';

describe('ArtistCalendarComponent', () => {
  let component: ArtistCalendarComponent;
  let fixture: ComponentFixture<ArtistCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
