import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineChatComponent } from './online-chat.component';

describe('OnlineChatComponent', () => {
  let component: OnlineChatComponent;
  let fixture: ComponentFixture<OnlineChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
