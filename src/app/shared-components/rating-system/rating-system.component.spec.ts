import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSystemComponent } from './rating-system.component';
import { OnlineChatModule } from 'app/Modules/online-chat/online-chat.module';
import { MatCardModule, MatButtonModule, MatInputModule, MatRippleModule, MatFormFieldModule, MatTooltipModule, MatCalendar, MatChipsModule, MatSelectModule, MatListModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatListItem, MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule, MatSlideToggleModule, MatIcon, MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('RatingSystemComponent', () => {
  let component: RatingSystemComponent;
  let fixture: ComponentFixture<RatingSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatCardModule,
        MatListModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        NgbModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        OnlineChatModule,
        MatSlideToggleModule,
        MatIconModule
      ],
      declarations: [ RatingSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
