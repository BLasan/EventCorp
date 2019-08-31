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

    logIn(role:string,email:string){
        localStorage.setItem('loggedIn','true');
        localStorage.setItem('user_name',email);
        localStorage.setItem('role',role)
    }

    logOut(){
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user_name');
        localStorage.removeItem('role');
    }

}
