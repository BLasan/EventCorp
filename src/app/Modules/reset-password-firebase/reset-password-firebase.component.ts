import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {confirmPassword} from '../../services/confirm-password.service';
import { ResetPasswordService } from 'app/services/reset_password.service';
import {redirect_to_login} from 'scripts/redirect_to';
@Component({
  selector: 'app-reset-password-firebase',
  templateUrl: './reset-password-firebase.component.html',
  styleUrls: ['./reset-password-firebase.component.scss']
})
export class ResetPasswordFirebaseComponent implements OnInit {
  form:any;
  success_message:any;
  constructor(private _resetPassword:ResetPasswordService) { }

  ngOnInit() {
    this.form=new FormGroup({
      userpassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
      reenterpassword:new FormControl('',[Validators.required,confirmPassword('userpassword')]),
    }); 
  }

  reset_password(){
    let password= (<HTMLInputElement>document.getElementById('user_password')).value;
    console.log(password)
    this._resetPassword.reset_password_user(password).subscribe(data=>{
      this.success_message=data;
      if(this.success_message.success){
        redirect_to_login();
      }
      else console.log("Error");
    })
  }

}

