import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }

    reset_password(email:string){              //enter email for reset password
        return this.http.post(`${this._url}/reset_password_email`,[email]);
    }

    reset_password_user(password:any){           //reset user password
        return this.http.post(`${this._url}/reset_password`,[password]);
    }

}
