import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWarningsComponent } from './report-warnings.component';

describe('ReportWarningsComponent', () => {
  let component: ReportWarningsComponent;
  let fixture: ComponentFixture<ReportWarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportWarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
