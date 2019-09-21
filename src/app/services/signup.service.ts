import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }

    signup(user_data:any){
        return this.http.post(`${this._url}/sign_up`,user_data);
    }
}
