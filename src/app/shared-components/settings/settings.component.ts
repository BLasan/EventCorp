import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {confirmPassword} from '../../services/confirm-password.service'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  form:any;
  constructor() { }

  ngOnInit() {
    this.form=new FormGroup({
      new_password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      re_enter_password:new FormControl('',[Validators.required,confirmPassword('new_password')])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

}
