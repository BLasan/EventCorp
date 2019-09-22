import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }

    checkCredentials(email:string,password:string){
        return this.http.post(`${this._url}/login_credentials`,[email,password]);
    }

    logIn(role:string,email:string,user_token:string,name:string){
        localStorage.setItem('loggedIn','true');
        localStorage.setItem('nameId',name);
        localStorage.setItem('user_name',email);
        localStorage.setItem('role',role);
        localStorage.setItem('user_token',user_token);
    }

    logOut(){
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user_name');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('nameId');
    }

    activateRememberUser(email:string){
        localStorage.setItem('remember_me','true');
        localStorage.setItem('user_email',email);
    }

    destroyRememberUser(){
        localStorage.removeItem('remember_me');
        localStorage.removeItem('user_email');
    }

}
