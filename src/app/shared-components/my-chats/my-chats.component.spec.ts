import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChatsComponent } from './my-chats.component';

describe('MyChatsComponent', () => {
  let component: MyChatsComponent;
  let fixture: ComponentFixture<MyChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
