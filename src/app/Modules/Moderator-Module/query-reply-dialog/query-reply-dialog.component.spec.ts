import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryReplyDialogComponent } from './query-reply-dialog.component';

describe('QueryReplyDialogComponent', () => {
  let component: QueryReplyDialogComponent;
  let fixture: ComponentFixture<QueryReplyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryReplyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryReplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
