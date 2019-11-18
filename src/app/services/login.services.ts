import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient,private database:AngularFirestore) { }

    checkCredentials(email:string,password:string){
        return this.http.post(`${this._url}/login_credentials`,[email,password]);
    }

    logIn(role:string,email:string,user_token:string,name:string){
        localStorage.setItem('loggedIn','true');
        localStorage.setItem('nameId',name);
        localStorage.setItem('user_name',email);
        localStorage.setItem('role',role);
       // localStorage.setItem('user_token',user_token);
    }

    logOut(){
        let success:any;
        localStorage.removeItem('loggedIn');
        // this.http.post(`${this._url}/logout_user`,[localStorage.getItem('user_name')]).subscribe(data=>{
        //     success=data;
        //     //alert('LOGGED OUTR')
        //     if(success.success==true){
        //         localStorage.removeItem('user_name');
        //         localStorage.removeItem('role');
        //         localStorage.removeItem('token');
        //         localStorage.removeItem('nameId');
        //     }
        //     else alert('Error logging-out');
        // })

        this.database.collection('register_user').doc(localStorage.getItem('user_name')).update({active_status:'logout'}).then(()=>{
            localStorage.removeItem('user_name');
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            localStorage.removeItem('nameId');
        }).catch(err=>{
            alert('Error logging-out');
        })

    }

    activateRememberUser(email:string){
        localStorage.setItem('remember_me','true');
        localStorage.setItem('remember_user_email',email);
    }

    destroyRememberUser(){
        localStorage.removeItem('remember_me');
        localStorage.removeItem('remember_user_email');
    }

    currentUser(): string {
        return localStorage.getItem('user_name');
    }


}
