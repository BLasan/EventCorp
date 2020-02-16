import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule, MatCardModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { ResetPasswordFirebaseComponent } from './reset-password-firebase/reset-password-firebase.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuardResetPasswordService } from 'app/services/Authentication/authGuard_reset_password.service';
import { MapsComponent } from './Supplier-Module/maps/maps.component';
import { ViewBillComponent } from './Organizer-Module/view-bill/view-bill.component';

@NgModule({
  declarations: [ResetPasswordComponent,ResetPasswordFirebaseComponent],
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
  providers:[AuthGuardResetPasswordService]
  
})
export class PasswordResetModule { }
