import { Component, OnInit } from '@angular/core';
import { SignupService } from 'app/services/signup.service';
import {redirect_to_login} from 'scripts/redirect_to';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  user_email:string;
  success_message:any;
  constructor(private _verifyEmail:SignupService,private auth:AngularFireAuth,private database:AngularFirestore) { }

  ngOnInit() {
    this.user_email=localStorage.getItem('signedUpEmail');
    console.log(this.user_email)
    this.database.collection('register_user').doc(this.user_email).update({verification:true}).then(()=>{
        redirect_to_login();
    }).catch(err=>{

    })
    localStorage.removeItem('signedUpEmail');
    // this._verifyEmail.validateEmail(location_string).subscribe(data=>{
    //   this.success_message=data;
    //   console.log(this.success_message.success)
    //   if(this.success_message.success){
    //     redirect_to_login();
    //   }
    //   else alert('Verification Failed');
    // })
  }

}
