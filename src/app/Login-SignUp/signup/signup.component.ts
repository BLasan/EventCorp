import { Component, OnInit, ViewChild } from '@angular/core';
import {states} from '../../../scripts/state_data.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {confirmPassword} from '../../services/confirm-password.service';
import { stringify } from '@angular/core/src/util';
import {validContact} from '../../services/contact_validation.service'
import { MatSelect } from '@angular/material';
import { state } from '@angular/animations';
import { SignupService } from 'app/services/signup.service.js';
import CryptoJS from 'crypto-js';
import {redirect_to_login} from '../../../scripts/signup_validation';
import { AngularFirestore } from '@angular/fire/firestore';
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
  success:any;
  user_name:string;
  user_emails:any=[];
  constructor(private _signup:SignupService,private db:AngularFirestore) { }

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


  //load all emails to check duplicates
  loadEmails(){
    var _this=this;
    this.db.firestore.collection('register_user').get().then(docs=>{
      if(docs.empty) console.log("Empty");
      else{
        docs.forEach(doc=>{
          _this.user_emails.push(doc.id);
        })
      }
    })
  }

  
  //signup
  signUp(){
    let user_email= (<HTMLInputElement>document.getElementById('user_email')).value;
    if(this.user_emails.some(x=>x!==user_email)){
      let user_name= (<HTMLInputElement>document.getElementById('user_name')).value;
      let user_role= (<HTMLInputElement>document.getElementById('role_sel')).value;
      let user_address1= (<HTMLInputElement>document.getElementById('address1')).value;
      let user_address2= (<HTMLInputElement>document.getElementById('address2')).value;
      let user_city= (<HTMLInputElement>document.getElementById('city')).value;
      let user_state= (<HTMLInputElement>document.getElementById('state_sel')).value;
      let user_countryCode= (<HTMLInputElement>document.getElementById('countryCode_sel')).value;
      let user_contact= (<HTMLInputElement>document.getElementById('contact')).value;
      let user_password= (<HTMLInputElement>document.getElementById('user_password')).value;
      var hash= CryptoJS.SHA256(user_password).toString();
      let user_data={user_name:user_name,email:user_email,role:user_role,address1:user_address1,address2:user_address2,city:user_city,state_sel:user_state
                     ,country_code:user_countryCode,contact:user_contact,password:hash,view_signup_notification:false,active_status:'logout',profile_status:'Active',verification:false,image_url:'assets/img/faces/pro_ing.png'};
                  
      this._signup.signup(user_data);  
    }
    else{
      alert("User Already Exists");
    }

    // this._signup.signup(user_data).subscribe(data=>{
    //   this.success=data;
      
    //   if(this.success.success==true){
    //     redirect_to_login();
    //   }

    //   else this.success=false;

    // });
  }

}
