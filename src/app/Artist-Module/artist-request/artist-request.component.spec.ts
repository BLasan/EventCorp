import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRequestComponent } from './artist-request.component';

describe('ArtistRequestComponent', () => {
  let component: ArtistRequestComponent;
  let fixture: ComponentFixture<ArtistRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
