import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistNotificationComponent } from './artist-notification.component';

describe('ArtistNotificationComponent', () => {
  let component: ArtistNotificationComponent;
  let fixture: ComponentFixture<ArtistNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
