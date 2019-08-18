import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CustomerLayoutRoutes} from './customer-layout.routing';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule
  } from '@angular/material';

import { from } from 'rxjs';
import { CustomerHomeComponent } from '../../Modules/Customer-Module/customer-home/customer-home.component';

  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(CustomerLayoutRoutes),
      FormsModule,
      MatButtonModule,
      MatRippleModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatTooltipModule,
    ],
    declarations: [
     CustomerHomeComponent
    ],
   
  })
  
  export class CustomerLayoutModule {}
  
