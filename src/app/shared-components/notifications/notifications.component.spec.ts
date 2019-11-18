import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { NotificationsComponent } from './notifications.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatCardModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlineChatModule } from 'app/Modules/online-chat/online-chat.module';
=======
<<<<<<< HEAD:src/app/Modules/Admin-Module/admin-notifications/admin-notifications.component.spec.ts
import { AdminNotificationsComponent } from './admin-notifications.component';

describe('NotificationsComponent', () => {
  let component: AdminNotificationsComponent;
  let fixture: ComponentFixture<AdminNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotificationsComponent ]
=======
import { NotificationsComponent } from './notifications.component';
>>>>>>> af05326492d9b3a8f847cbc07022301514769862

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
      imports: [
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
      declarations: [ NotificationsComponent ]
=======
      declarations: [ NotificationsComponent ]
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/shared-components/notifications/notifications.component.spec.ts
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(NotificationsComponent);
=======
<<<<<<< HEAD:src/app/Modules/Admin-Module/admin-notifications/admin-notifications.component.spec.ts
    fixture = TestBed.createComponent(AdminNotificationsComponent);
=======
    fixture = TestBed.createComponent(NotificationsComponent);
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/shared-components/notifications/notifications.component.spec.ts
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
