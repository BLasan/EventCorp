import { Component, OnInit } from '@angular/core';
import { SignupService } from 'app/services/signup.service';
import {redirect_to_login} from 'scripts/redirect_to';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  user_email:string;
  link:any;
  isValidated:boolean=false;
  success_message:any;
  constructor(private route:ActivatedRoute,private database:AngularFirestore) { }

  ngOnInit() {
    var _this=this;
    // this.user_email=localStorage.getItem('signedUpEmail');

    //get parameters
    this.route.params.subscribe(params => {
    //  this.user_email=params.email;
     this.link=params.link;

     //check if validated link
     this.database.firestore.collection('register_user').where('verification_link','==',this.link).get().then(doc=>{
      if(doc.empty) _this.isValidated=false;
      else{
        doc.forEach(docs=>{
          console.log(docs.id)
          _this.user_email=docs.id;
          if(docs.data().verification===false) _this.isValidated=false;
          else _this.isValidated=true;
        });

        //upload verfication status
        _this.database.collection('register_user').doc(_this.user_email).update({verification:true,verification_link:_this.link}).then(()=>{
          redirect_to_login();
        }).catch(err=>{
          console.log(err);
        })
      }
     })
   });
    // console.log(this.user_email);
    // localStorage.removeItem('signedUpEmail');
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
