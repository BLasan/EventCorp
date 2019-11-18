import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueAddComponent } from './venue-add.component';

describe('VenueAddComponent', () => {
  let component: VenueAddComponent;
  let fixture: ComponentFixture<VenueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
