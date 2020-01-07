
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.services';
import {redirect_to} from '../../../scripts/redirect_to';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import CryptoJS from 'crypto-js';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isInValid:boolean=false;
  isLoading:boolean=false;
  validation:any;
  checked:any;
  form: any;
  isTrue:boolean=true;
  constructor(private login_service:LoginService,private _db:AngularFirestore,private auth:AngularFireAuth) { }

  ngOnInit() {
   
    //check the remember me checked?
    if(localStorage.getItem('remember_me')=='true'){
     (<HTMLInputElement>document.getElementById('user_name')).value=localStorage.getItem('remember_user_email');
     (<HTMLInputElement>document.getElementById('remember_user')).checked=true;
    }
    this.form=new FormGroup({
      user_name:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    });  
  }


  //validate login
  login_validate(){
    this.isLoading=true;
    var _this=this;
    let email=(<HTMLInputElement>document.getElementById('user_name')).value;
    let password=(<HTMLInputElement>document.getElementById('password')).value;
    let remember_token=(<HTMLInputElement>document.getElementById('remember_user')).checked;
    this.checked=remember_token;
    var hash= CryptoJS.SHA256(password).toString();
    console.log(email);

    //get credentials validation
    // this._db.collection('register_user').doc(email).update({active_status:'login'})
    // this._db.firestore.collection('register_user').doc(email).get().then((doc)=>{
    //   console.log("Hello")
    //   if(doc.data().active_status==="login" && doc.data().password===hash && doc.data().verification){
    //     _this.isTrue=true;
    //     if(_this.checked) _this.login_service.activateRememberUser(email);
    //     else _this.login_service.destroyRememberUser();
    //     _this.login_service.logIn(doc.data().role,doc.data().email," ",doc.data().user_name,hash);
    //   }
    //   else _this.isTrue=false;
    //   // redirect_to(doc.data().role);
    // }).catch(err=>{
    //   console.log(err);
    //   _this.isTrue=false;
    // });
    
    this._db.firestore.collection("register_user").doc(email)
    .get().then(function(doc) {
      if(doc.data().profile_status==="Active" && doc.data().password===hash && doc.data().verification){
        _this.isTrue=true;
        if(_this.checked) _this.login_service.activateRememberUser(email);
        else _this.login_service.destroyRememberUser();

        _this._db.firestore.collection("register_user").doc(email).update({active_status:"login"}).then(()=>{
          _this.isLoading=false;
          localStorage.setItem('loggedIn','true');
          localStorage.setItem('nameId',doc.data().user_name);
          localStorage.setItem('user_name',email);
          localStorage.setItem('role',doc.data().role);
          _this.auth.auth.signInWithEmailAndPassword(email,hash).then((user)=>{
            redirect_to(doc.data().role);
          })
        }).catch(err=>{
          console.log(err);
        })
        //  _this.login_service.logIn(doc.data().role,doc.data().email," ",doc.data().user_name,hash);
      }
      else{
        _this.isTrue=false;
        _this.isLoading=false;
      } 

      })
 


    // this.login_service.checkCredentials(email,password).subscribe((data)=>{
    //   console.log('Hello')
    //   this.validation=data;
    //   console.log(this.validation.isTrue);
    //   if(this.validation.isTrue && this.validation.verification){
    //     this.isTrue=true;
    //     this.login_service.logIn(this.validation.role,email,this.validation.token,this.validation.user_name);
    //     if(this.checked){
    //       this.login_service.activateRememberUser(email);
    //     }
    //     else this.login_service.destroyRememberUser();
    //     redirect_to(this.validation.role);
    //   }
    //   else{
    //     this.isTrue=false;
    //     this.isInValid=true
    //   }
     

    // });

  }

}

