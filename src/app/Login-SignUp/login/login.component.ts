import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.services';
import {redirect_to} from '../../../scripts/redirect_to.js'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isInValid:boolean=false;
  validation:any;
  checked:any;
  constructor(private login_service:LoginService) { }

  ngOnInit() {

    if(localStorage.getItem('remember_me')=='true'){
      (<HTMLInputElement>document.getElementById('user_name')).value=localStorage.getItem('user_email');
    }
  }

  login_validate(){

    let email=(<HTMLInputElement>document.getElementById('user_name')).value;
    let password=(<HTMLInputElement>document.getElementById('password')).value;
    console.log(email);
    this.login_service.checkCredentials(email,password).subscribe((data)=>{
      console.log('Hello')
      this.validation=data;
      console.log(this.validation.isTrue);
      if(this.validation.isTrue){
        this.login_service.logIn(this.validation.role,email,this.validation.token,this.validation.user_name);
        if(this.checked){
          this.login_service.activateRememberUser(email);
        }
        else this.login_service.destroyRememberUser();
        redirect_to(this.validation.role);
      }
     
      else
      this.isInValid=true

    });

  }

}
