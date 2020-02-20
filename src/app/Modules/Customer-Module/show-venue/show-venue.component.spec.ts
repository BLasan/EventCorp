import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVenueComponent } from './show-venue.component';

describe('ShowVenueComponent', () => {
  let component: ShowVenueComponent;
  let fixture: ComponentFixture<ShowVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
