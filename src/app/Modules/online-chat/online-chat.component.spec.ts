import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineChatComponent } from './online-chat.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule, MatCardModule, MatIconModule, MatCheckboxModule, MatListModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('OnlineChatComponent', () => {
  let component: OnlineChatComponent;
  let fixture: ComponentFixture<OnlineChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        // NotifierModule,
        MatCheckboxModule,
        MatListModule,
        MatButtonModule
      ],
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
