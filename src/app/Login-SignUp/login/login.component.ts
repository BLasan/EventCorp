
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
    let email=(<HTMLInputElement>document.getElementById('user_name')).value;
    let password=(<HTMLInputElement>document.getElementById('password')).value;
    let remember_token=(<HTMLInputElement>document.getElementById('remember_user')).checked;
    this.checked=remember_token;

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
    
    //get user credentials
    this._db.firestore.collection("register_user").doc(email)
    .get().then(function(doc) {
      if(!doc.exists){
        _this.isTrue=false;
        _this.isLoading=false;
      }
      else{
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

          // _this._db.firestore.collection("register_user").doc(email).update({active_status:"login"}).then(()=>{
          //   _this.isLoading=false;
          //   localStorage.setItem('loggedIn','true');
          //   localStorage.setItem('nameId',doc.data().user_name);
          //   localStorage.setItem('user_name',email);
          //   localStorage.setItem('role',doc.data().role);
          //   _this.auth.auth.signInWithEmailAndPassword(email,hash).then((user)=>{
          //   user.user.getIdToken().then(user=>{
          //     localStorage.setItem('authToken',user.toString());
          //     redirect_to(doc.data().role);
          //   });
          //   })
          // }).catch(err=>{
  
          //   //if no user occurs
          //   _this.isLoading=false;
          //   _this.isTrue=false;
          //   console.log(err);
          // })
          //  _this.login_service.logIn(doc.data().role,doc.data().email," ",doc.data().user_name,hash);
        }
        else{
          _this.isTrue=false;
          _this.isLoading=false;
        } 
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

  getMessage(){
    let message="<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html><head><meta charset='UTF-8'>"+
        "<meta content='width=device-width, initial-scale=1' name='viewport'>"+
        "<meta name='x-apple-disable-message-reformatting'>"+
        "<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
        "<meta content='telephone=no' name='format-detection'>"+
        "<title></title>"+
        "</head>"+
        "<body>"+
        "<div id=':mx' class='ii gt'><div id=':mw' class='a3s aXjCH msg1283199651525359358'><u></u>"+
        "<div marginwidth='0' marginheight='0' bgcolor='#F6F6F6' style='Margin:0;box-sizing:border-box;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important'>"+
        "<table class='m_1283199651525359358body' border='0' cellspacing='0' cellpadding='0' width='100%' height='100%' style='Margin:0;background:#e4e8ee;border-collapse:collapse;border-spacing:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;height:100%;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;width:100%'>"+
          "<tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
            "<td align='center' valign='top' bgcolor='#F6F6F6' style='Margin:0;background:#e4e8ee!important;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;padding-bottom:20px;text-align:left;vertical-align:top;word-wrap:break-word'>"+
              "<center style='min-width:580px;width:100%'>"+
                "<table align='center' style='Margin:0 auto;background:#1e2530;border-bottom:none;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:20px;text-align:left;vertical-align:top;word-wrap:break-word'>"+
                  "<table align='center' class='m_1283199651525359358container' style='Margin:0 auto;background:transparent;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:inherit;vertical-align:top;width:580px'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
                  "<table class='m_1283199651525359358row m_1283199651525359358collapse' style='border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
                    "<th class='m_1283199651525359358small-12 m_1283199651525359358columns' style='Margin:0 auto;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:588px'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><th style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left'>"+
                    "<h1 style='Margin:0;Margin-bottom:px;color:#ffffff;font-family:Georgia,serif;font-size:30px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:px;padding:0;text-align:left;word-wrap:normal'>"+
                      "EventCorp"+
                    "</h1>"+
                    "</th>"+
                    "<th class='m_1283199651525359358expander' style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0!important;text-align:left;width:0'></th></tr></tbody></table></th>"+
                  "</tr></tbody></table>"+
                  "</td></tr></tbody></table>"+
                "</td></tr></tbody></table>"+
                "<table style='Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                "<table align='center' class='m_1283199651525359358container' style='Margin:0 auto;Margin-top:10px;background:#ffffff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;margin-top:10px;padding:0;text-align:center;vertical-align:top;width:580px'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
                  "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                  "<table class='m_1283199651525359358row' style='border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
                    "<th class='m_1283199651525359358small-12 m_1283199651525359358columns' style='Margin:0 auto;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:564px'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><th style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left'>"+
                    "<h3 class='m_1283199651525359358avoid-auto-linking' style='Margin:0;color:#5d6879;font-family:Georgia,serif;font-size:24px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;word-wrap:normal'>"+
                       "Verify Email"+
                    "</h3>"+
                  "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                    "<p style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
                     "Hello,"+
                    "</p>"+
                    "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
                    "</p><p>You have to verify your Email to enter to the EventCorp.</p>"+
                    "<p></p>"+
                    "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                      "<center style='min-width:532px;width:100%'>"+
                    "<table class='m_1283199651525359358button' style='Margin:0 0 16px 0;border-collapse:collapse;border-spacing:0;float:none;margin:0 0 16px 0;padding:0;text-align:center;vertical-align:top;width:auto'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;border-radius:9999px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;background:#4f9c45;border:none;border-collapse:collapse!important;border-radius:9999px;color:#fefefe;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
                      "<a href='https://www.overleaf.com/user/password/set?passwordResetToken=c85f1f226d5acf5212e0069271279a5b7ff96c3a2d7c359c226fec5b8eaeca2a&amp;email=benuraab%40gmail.com' style='Margin:0;border:0 solid #4f9c45;border-radius:9999px;color:#fefefe;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:1.3;margin:0;padding:8px 16px 8px 16px;text-align:left;text-decoration:none' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://www.overleaf.com/user/password/set?passwordResetToken%3Dc85f1f226d5acf5212e0069271279a5b7ff96c3a2d7c359c226fec5b8eaeca2a%26email%3Dbenuraab%2540gmail.com&amp;source=gmail&amp;ust=1579308518849000&amp;usg=AFQjCNEJRyD1OJWAP4vbAthF3iUsm5woaw'>"+
                        "Verify Email"+
                      "</a>"+
                    "</td></tr></tbody></table></td></tr></tbody></table>"+
                    "</center>"+
          "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
          "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
            "</p><p>If you ignore this message, you will not be eligible to enter to the EventCorp.</p>"+
          "<p>If you didn't request a email verification, let us know.</p>"+
          "<p></p>"+
          "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
          "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
          "If the button above does not appear, please copy and paste this link into your browser's address bar:<br>"+
          "</p><p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;margin:0;margin-bottom:10px;padding:0;text-align:left'><a href='https://www.overleaf.com/user/password/set?passwordResetToken=c85f1f226d5acf5212e0069271279a5b7ff96c3a2d7c359c226fec5b8eaeca2a&amp;email=benuraab%40gmail.com' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://www.overleaf.com/user/password/set?passwordResetToken%3Dc85f1f226d5acf5212e0069271279a5b7ff96c3a2d7c359c226fec5b8eaeca2a%26email%3Dbenuraab%2540gmail.com&amp;source=gmail&amp;ust=1579308518849000&amp;usg=AFQjCNEJRyD1OJWAP4vbAthF3iUsm5woaw'>https://www.overleaf.com/user/<wbr>password/set?<wbr>passwordResetToken=<wbr>c85f1f226d5acf5212e0069271279a<wbr>5b7ff96c3a2d7c359c226fec5b8eae<wbr>ca2a&amp;email=benuraab%40gmail.<wbr>com</a></p>"+
          "<p></p>"+
          "</th>"+
          "<th class='m_1283199651525359358expander' style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0!important;text-align:left;width:0'></th></tr></tbody></table></th>"+
          "</tr></tbody></table>"+
          "<table align='center' style='background:#e4e8ee;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
          "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='10px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:normal;line-height:10px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
          "<p style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'><small style='color:#5d6879;font-size:80%'>"+
          "<a href='https://www.overleaf.com' style='Margin:0;color:#4f9c45;font-family:Helvetica,Arial,sans-serif;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://www.overleaf.com&amp;source=gmail&amp;ust=1579308518849000&amp;usg=AFQjCNF1J5tnbze5l7Q8c674a241X3viuA'>https://www.overleaf.com</a>"+
          "/small></p>"+
          "</td></tr></tbody></table>"+
          "</td></tr></tbody></table>"+
          "</center>"+
          "</td>"+
          "</tr>"+
          "</tbody></table>"+
          "<div style='display:none;white-space:nowrap;font:15px courier;line-height:0'> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>"+
          "<img src='https://ci3.googleusercontent.com/proxy/HdehxmK1b5Akulro3QsNjlwrJMiBNkzLUs0IYl8Z7p_ejpSw3dIWm7lXD6m7zHJlvgGaN-mqZMPnBh4J4B5rRaHEkCLMp6AieRvDJpV5yOL591GlcKzQUrvZuowvjaJrHCn3bhojFOnOHMjJGdnTjjoCjQ3jCZ6uTix1MpEvdqcf7i6DrxF6r9yS3CbNBCbTKzMLVvjbO2m7GR1Fk0_S8ScA_2d34ykilEQJ0rKKt5wgxFrtkNd7KPOfkiVdBmFe3ukWrco6Z9mHZonVzFB_fGesWWYFWEPuhE3ZvM8zsr-Z31mFLhJo7AHDrA17SXoW0HB6vCqwFh_lzU7w2_fA21qDy9BmdeMa1vWcSrBC1kJWcEBcE1IBiGYOryKRgj7pYiF6SlFCVbeJ53aF7mCH97bhwE6RJQ_-xyJjUJjsdlfQ37EPzxYlC27c7dUcNfkpcMC-b2AfylwgCfc=s0-d-e1-ft#http://email-link.overleaf.com/wf/open?upn=hHCzDyOaMqV-2BKGOubZbS-2FsKms-2B0H-2B625sn5WlmTP-2BdsG1hT-2FhQhCa3xVME-2FGESiKhhgcDaS1J1-2BOmBIa4G9G9c-2FGq8dbpuqq73ttdsHIiW7NDaBwShUOC6U-2BR-2FppzUOyd3eg80BZm-2FHUeF1YCI-2FtEaxGoE7POnsXXROKVWjSSmAaLd0Lh9m0Ht97EIp4tq0uirvv0VAVWQPtd9QQSh0WYw7-2BNV3f39zYKbNOiiD2SIGe1AAKrUJGiWTHzlsUxEkg' alt='' width='1' height='1' border='0' style='height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important' class='CToWUd'></div><div class='yj6qo'></div><div class='adL'>"+
          "</div></div></div>"+
          "</body>"+
          "</html>";

          return message;
  }

}

