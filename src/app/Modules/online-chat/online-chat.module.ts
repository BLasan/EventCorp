import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule, MatCardModule, MatIconModule, MatCheckboxModule, MatListModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { OnlineChatComponent } from './online-chat.component';
@NgModule({
  declarations: [OnlineChatComponent],
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
    NotifierModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule
  ],
  exports:[OnlineChatComponent]
})
export class OnlineChatModule { }
