import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {redirect_to_login} from '../../scripts/signup_validation';
@Injectable({
    providedIn: 'root'
})
export class SignupService{
    private _url: string = "http://localhost:4600";

    // private user:User;
    constructor(private http: HttpClient,private firebaseAuth:AngularFireAuth,private _db:AngularFirestore) { }

    signup(user_data:any){
        
        var _this=this;
        this.firebaseAuth.auth.createUserWithEmailAndPassword(user_data.email,user_data.password).then(value=>{
            console.log("Successfull "+value.user.uid);
            value.user.updateProfile({displayName:user_data.user_name});
            var json_obj={user_name:user_data.email,nameId:user_data.user_name,role:user_data.role};
            _this._db.collection('register_user').doc(user_data.email).set(user_data).then(doc=>{
                console.log("Successfully Signup");
                value.user.sendEmailVerification().then(success=>{
                    console.log(success);
                    redirect_to_login();
                    return "Success";
                }).catch(err=>{
                    return "Error Signup";
                    console.log(err);
                })
            }).catch(err=>{
                return "Error Signup";
                console.log(err);
            })

        }).catch(err=>{
            console.log(err);
        });

        //return this.http.post(`${this._url}/sign_up`,user_data);
    }

    updateData(user_data:any){
        return this.http.post(`${this._url}/edit_user_details`,[user_data.user_name,user_data.email,user_data.address,user_data.city,user_data.state,user_data.contact,user_data.bio]);
    }

    validateEmail(location:any){
        return this.http.post(`${this._url}/validate_email`,[location]);
    }
}
