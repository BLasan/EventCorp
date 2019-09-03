import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule, MatCardModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
@NgModule({
  declarations: [SignupComponent,LoginComponent],
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
    MatCheckboxModule
  ],
  exports:[SignupComponent,LoginComponent]
})
export class LoginSignupModule { }
