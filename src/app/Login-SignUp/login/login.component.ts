
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.services';
import {redirect_to} from 'scripts/redirect_to';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isInValid:boolean=false;
  validation:any;
  checked:any;
  form: any;
  isTrue:boolean=true;
  constructor(private login_service:LoginService) { }

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

    let email=(<HTMLInputElement>document.getElementById('user_name')).value;
    let password=(<HTMLInputElement>document.getElementById('password')).value;
    let remember_token=(<HTMLInputElement>document.getElementById('remember_user')).checked;
    this.checked=remember_token;
    console.log(email);

    //get credentials validation
    this.login_service.checkCredentials(email,password).subscribe((data)=>{
      console.log('Hello')
      this.validation=data;
      console.log(this.validation.isTrue);
      if(this.validation.isTrue && this.validation.verification){
        this.isTrue=true;
        this.login_service.logIn(this.validation.role,email,this.validation.token,this.validation.user_name);
        if(this.checked){
          this.login_service.activateRememberUser(email);
        }
        else this.login_service.destroyRememberUser();
        redirect_to(this.validation.role);
      }
      else{
        this.isTrue=false;
        this.isInValid=true
      }
     

    });

  }

}

