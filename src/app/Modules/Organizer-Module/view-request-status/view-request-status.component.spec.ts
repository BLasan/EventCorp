import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestStatusComponent } from './view-request-status.component';

describe('ViewRequestStatusComponent', () => {
  let component: ViewRequestStatusComponent;
  let fixture: ComponentFixture<ViewRequestStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRequestStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
