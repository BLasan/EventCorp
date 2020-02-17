import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPastEventsComponent } from './view-past-events.component';

describe('ViewPastEventsComponent', () => {
  let component: ViewPastEventsComponent;
  let fixture: ComponentFixture<ViewPastEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPastEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPastEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
