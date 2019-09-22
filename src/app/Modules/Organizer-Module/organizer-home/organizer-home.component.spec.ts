import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerHomeComponent } from './organizer-home.component';

describe('OrganizerHomeComponent', () => {
  let component: OrganizerHomeComponent;
  let fixture: ComponentFixture<OrganizerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
