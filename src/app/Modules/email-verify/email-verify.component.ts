import { Component, OnInit } from '@angular/core';
import { SignupService } from 'app/services/signup.service';
import {redirect_to_login} from 'scripts/redirect_to';
@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  user_email:string;
  success_message:any;
  constructor(private _verifyEmail:SignupService) { }

  ngOnInit() {
    this.user_email=localStorage.getItem('signedUpEmail');
    console.log(location.href+"->HREF");
    let location_string=location.href.toString();
    this._verifyEmail.validateEmail(location_string).subscribe(data=>{
      this.success_message=data;
      console.log(this.success_message.success)
      if(this.success_message.success){
        redirect_to_login();
      }
      else alert('Verification Failed');
    })
  }

}
