
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.services';
import {redirect_to} from '../../../scripts/redirect_to';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import CryptoJS from 'crypto-js';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { CookieService } from "angular2-cookie/core";
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
  isRegistered:boolean=false;
  isTrue:boolean=true;
  constructor(private login_service:LoginService,private _db:AngularFirestore,private auth:AngularFireAuth,private cookie:CookieService) { }

  ngOnInit() {
   let user_name_val; 
    //check the remember me checked?
    if(this.cookie.get('user_name')){
      user_name_val=this.cookie.get('user_name');
      (<HTMLInputElement>document.getElementById('remember_user')).checked=true;
    }
    else user_name_val="";

    // if(localStorage.getItem('remember_me')=='true'){
    //  (<HTMLInputElement>document.getElementById('user_name')).value=localStorage.getItem('remember_user_email');
    //  (<HTMLInputElement>document.getElementById('remember_user')).checked=true;
    // }

    this.form=new FormGroup({
      user_name:new FormControl(user_name_val,[Validators.required]),
      password:new FormControl('',[Validators.required])
    });  
  }


  
  //validate login
  login_validate(){
    this.isLoading=true;
    var _this=this;
    this.isInValid=false;
    this.isTrue=false;
    this.isRegistered=false;
    let email=(<HTMLInputElement>document.getElementById('user_name')).value;
    let password=(<HTMLInputElement>document.getElementById('password')).value;
    let remember_token=(<HTMLInputElement>document.getElementById('remember_user')).checked;
    this.checked=remember_token;
    let password_ele=(<HTMLInputElement>document.getElementById('password'));
    var hash=CryptoJS.SHA256(password).toString();

    //set cookies
    var email_hash=CryptoJS.SHA256(email).toString();
    if(this.checked) this.cookie.put("user_name",email);
    else this.cookie.remove('user_name');

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


    //if the user is a moderator or admin
    if(email.indexOf('@')<=-1){
      this._db.firestore.collection('register_user').get().then(docs=>{
        if(docs.empty){
          _this.isTrue=false;
          _this.isLoading=false;
          _this.isRegistered=false;
          password_ele.value="";
        }
        else{
          _this.isRegistered=true;
          docs.forEach(doc=>{
            if(doc.data().id===email){
              _this.isLoading=false;
              _this._db.collection('register_user').doc(email).update({active_status:"login"}).then(()=>{
                _this.isTrue=true;
                localStorage.setItem('loggedIn','true');
                localStorage.setItem('nameId',doc.data().user_name);
                localStorage.setItem('user_name',email);
                localStorage.setItem('role',doc.data().role);
                localStorage.setItem('authToken',email);
              }).catch(err=>{
                _this.isTrue=false;
                console.log(err);
              })
            }
            else{
              _this.isTrue=false;
              _this.isLoading=false;
              password_ele.value="";
            }
          })
        }
      })
    }
    else{

    //get user credentials
    this._db.firestore.collection("register_user").doc(email)
    .get().then(function(doc) {
      if(!doc.exists){
        _this.isTrue=false;
        _this.isLoading=false;
        _this.isRegistered=false;
        password_ele.value="";
      }
      else{
        _this.isRegistered=true;
        if(doc.data().profile_status==="Active" && doc.data().password===hash && doc.data().verification){
          _this.isTrue=true;
        
          if(_this.checked) _this.login_service.activateRememberUser(email);
          else _this.login_service.destroyRememberUser();

          //login with email and password=firebase auth
          _this.auth.auth.signInWithEmailAndPassword(email,hash).then((user)=>{
            _this.isLoading=false;
            _this._db.firestore.collection('register_user').doc(email).update({active_status:'login',uId:user.user.uid,remember_me:_this.checked}).then(()=>{
              //store data
              localStorage.setItem('loggedIn','true');
              localStorage.setItem('nameId',doc.data().user_name);
              localStorage.setItem('user_name',email);
              localStorage.setItem('role',doc.data().role);
              //get user token
              user.user.getIdToken().then(user=>{
                localStorage.setItem('authToken',user.toString());
                redirect_to(doc.data().role);
              });
            }).catch(err=>{
              console.log(err);
              _this.isTrue=false;
            }).catch(err=>{
              console.log(err);
              _this.isTrue=false;
            })
          })
        }
        else{
          _this.isTrue=false;
          _this.isLoading=false;
          password_ele.value="";
        } 
      }
      });
    }
  }

}

