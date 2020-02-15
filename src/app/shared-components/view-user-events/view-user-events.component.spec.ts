import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserEventsComponent } from './view-user-events.component';

describe('ViewUserEventsComponent', () => {
  let component: ViewUserEventsComponent;
  let fixture: ComponentFixture<ViewUserEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
