import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LocationOwnerLayoutRoutes} from './location_owner.routing';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule
  } from '@angular/material';

import { from } from 'rxjs';

  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(LocationOwnerLayoutRoutes),
      FormsModule,
      MatButtonModule,
      MatRippleModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatTooltipModule,
    ],
    declarations: [
   
    ],
   
  })
  
  export class LocationOwnerLayoutModule {}
  
