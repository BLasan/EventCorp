import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {confirmPassword} from '../../services/confirm-password.service';
import { ResetPasswordService } from 'app/services/reset_password.service';
import {redirect_to_login} from 'scripts/redirect_to';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import CryptoJS from 'crypto-js';
import { AngularFireAuth } from '@angular/fire/auth';
import { CookieService } from "angular2-cookie/core";
@Component({
  selector: 'app-reset-password-firebase',
  templateUrl: './reset-password-firebase.component.html',
  styleUrls: ['./reset-password-firebase.component.scss']
})
export class ResetPasswordFirebaseComponent implements OnInit {
  form:any;
  success_message:any;
  uid:any;
  user_email:any;
  notUsed:boolean=false;
  constructor(private _resetPassword:ResetPasswordService,private route:ActivatedRoute,private db:AngularFirestore,private auth:AngularFireAuth,private cookie:CookieService,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uid=params['uid'];
      this.user_email=params['email'];
      console.log(this.user_email);
      let currentURL=this.router.url;
      console.log(currentURL);
      this.checkLink(CryptoJS.SHA256(currentURL).toString());
    });
    this.form=new FormGroup({
      userpassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
      reenterpassword:new FormControl('',[Validators.required,confirmPassword('userpassword')]),
    }); 
  }

  //update the password
  reset_password(){
    var _this=this;
    // let password= (<HTMLInputElement>document.getElementById('user_password')).value;
    // console.log(password)
    // this._resetPassword.reset_password_user(password).subscribe(data=>{
    //   this.success_message=data;
    //   if(this.success_message.success){
    //     redirect_to_login();
    //   }
    //   else console.log("Error");
    // })
    let password=CryptoJS.SHA256(this.form.get('userpassword').value).toString();
    this.db.firestore.collection('register_user').doc(this.user_email).get().then(doc=>{
      if(!doc.exists) alert('Empty Users');
      else{
          
        _this.auth.auth.signInWithEmailAndPassword(_this.user_email,doc.data().password).then(user=>{
          user.user.updatePassword(password).then(value=>{
            _this.db.collection('register_user').doc(doc.id).update({password:password}).then(()=>{
              _this.auth.auth.signOut();
              redirect_to_login();
            }).catch(err=>{
              console.log(err);
            })
            }).catch(err=>{
              console.log(err);
            })
          }).catch(err=>{
              console.log(err);
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  }


  //check used link
  checkLink(url:any){
    var _this=this;
    this.db.firestore.collection('passwordLinks').doc(url).get().then((docs)=>{
      if(!docs.exists) _this.notUsed=true;
      else _this.notUsed=false;
    }).catch(err=>{
      console.log(err);
    })
  }

}

