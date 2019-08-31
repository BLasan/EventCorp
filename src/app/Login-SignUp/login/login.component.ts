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
  constructor(private login_service:LoginService) { }

  ngOnInit() {

  }

  login_validate(){

    let email=(<HTMLInputElement>document.getElementById('user_name')).value;
    let password=(<HTMLInputElement>document.getElementById('password')).value;
    console.log(email);
    // let role=(<HTMLInputElement>document.getElementById('password')).value;
    this.login_service.checkCredentials(email,password).subscribe((data)=>{
      console.log('Hello')
      this.validation=data;
      console.log(this.validation.isTrue)
      // (<HTMLInputElement>document.getElementById('user_role')).value=this.validation.role;
      if(this.validation.isTrue){
        this.login_service.logIn(this.validation.role,email);
        redirect_to(this.validation.role);
      }
     
      else
      this.isInValid=true

    });

  }

}
