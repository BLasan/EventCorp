import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLayoutComponent } from './artist-layout.component';

describe('ArtistLayoutComponent', () => {
  let component: ArtistLayoutComponent;
  let fixture: ComponentFixture<ArtistLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
