import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueEditComponent } from './venue-edit.component';

describe('VenueEditComponent', () => {
  let component: VenueEditComponent;
  let fixture: ComponentFixture<VenueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
