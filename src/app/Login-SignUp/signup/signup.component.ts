import { Component, OnInit, ViewChild } from '@angular/core';
import {states} from '../../../scripts/state_data.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {confirmPassword} from '../../services/confirm-password.service';
import { stringify } from '@angular/core/src/util';
import {validContact} from '../../services/contact_validation.service'
import { MatSelect } from '@angular/material';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  
@ViewChild('roleSelect') roleSelect:MatSelect;
@ViewChild('stateSelect') stateSelect:MatSelect;
@ViewChild('codeSelect') codeSelect:MatSelect;

  form:any;
  states:any[];
  constructor() { }

  ngOnInit() {
    this.states=states;
    this.form=new FormGroup({
      user_name:new FormControl('',[Validators.required]),
      user_email:new FormControl('',[Validators.required,Validators.email]),
      role:new FormControl('',[Validators.required]),
      address1:new FormControl('',Validators.required),
      address2:new FormControl('',[]),
      state:new FormControl('',Validators.required),
      city:new FormControl('',[Validators.required]),
      contact:new FormControl('',[Validators.required]),
      user_password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      password_verify:new FormControl('',[Validators.required,confirmPassword('user_password')])
    });
  
  }

  ngAfterViewInit() {

  this.roleSelect.valueChange.subscribe(value => {
      console.log(value);
      (<HTMLInputElement>document.getElementById('role_sel')).value=value;
  });

  this.stateSelect.valueChange.subscribe(value => {
    console.log(value);
    (<HTMLInputElement>document.getElementById('state_sel')).value=value;
  });

  
  this.codeSelect.valueChange.subscribe(value => {
    console.log(value);
    (<HTMLInputElement>document.getElementById('countryCode_sel')).value=value;
  });


}

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

 changeRole(role){
    console.log(role)
  }

}
