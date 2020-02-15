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
  isLoaded:boolean=false;
  constructor(private route:ActivatedRoute,private database:AngularFirestore) { }

  ngOnInit() {
    var _this=this;
    // this.user_email=localStorage.getItem('signedUpEmail');

    //get parameters
    this.route.params.subscribe(params => {
    //  this.user_email=params.email;
     this.link=params.link;
     console.log(this.link);
     //check if validated link
     this.database.firestore.collection('register_user').get().then(doc=>{
      if(doc.empty){
        _this.isValidated=false;
        _this.isLoaded=true;
      }
      else{
        doc.forEach(docs=>{
          if(docs.data().uId==_this.link){
            _this.user_email=docs.id;
            _this.isLoaded=true;
            if(docs.data().verification===false){
              _this.isValidated=false;
              _this.database.collection('register_user').doc(_this.user_email).update({verification:true}).then(()=>{
                redirect_to_login();
              }).catch(err=>{
                console.log(err);
              })
            } 
            else _this.isValidated=true;
            //upload verfication status
          }
        });
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
