import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from 'app/services/reset_password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form:any;
  user_email:string;
  success_message:any;
  isSuccess:boolean=false;

  constructor(private _resetPassword:ResetPasswordService) { }

  ngOnInit() {
    this.form=new FormGroup({
      username:new FormControl('',[Validators.required,Validators.email]),
    }); 
  }

  reset_password(){
    this._resetPassword.reset_password(this.user_email).subscribe(data=>{
      console.log(data);
      this.success_message=data;
      if(this.success_message.success) this.isSuccess=true;
      else this.isSuccess=false;
    })
  }

}
