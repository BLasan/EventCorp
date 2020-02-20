import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {redirect_to} from '../../scripts/redirect_to';
import { ActivatedRoute, Router } from '@angular/router';
import { navigate_to_home} from '../../scripts/logout';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient,private database:AngularFirestore,private auth:AngularFireAuth) { }

    // checkCredentials(email:string,password:string){
    //     return this.http.post(`${this._url}/login_credentials`,[email,password]);
    // }

    logIn(role:string,email:string,user_token:string,name:string,hash:any){
        console.log(role)
        localStorage.setItem('loggedIn','true');
        localStorage.setItem('nameId',name);
        localStorage.setItem('user_name',email);
        localStorage.setItem('role',role);
        this.auth.auth.signInWithEmailAndPassword(email,hash).then((user)=>{
            // alert(user.user.uid);
            redirect_to(role);
        }).catch(err=>{
            console.log(err);
        })
       // localStorage.setItem('user_token',user_token);
    }

    logOut(){
        var user=localStorage.getItem("user_name");
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('nameId');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('searched_user_email');
        this.auth.auth.signOut().then(suc=>{
           
        }).catch(err=>{
           // alert(err);
        })
        navigate_to_home();
    }

    activateRememberUser(email:string){
        localStorage.setItem('remember_me','true');
        localStorage.setItem('remember_user_email',email);
    }

    destroyRememberUser(){
        if(localStorage.getItem('remember_me'))
        localStorage.removeItem('remember_me');
        if(localStorage.getItem('remember_user_email'))
        localStorage.removeItem('remember_user_email');
    }

    currentUser(): string {
        return localStorage.getItem('user_name');
    }


}
