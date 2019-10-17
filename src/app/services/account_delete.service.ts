import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DeleteAccountService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }

    delete_account(user_email:string){
        return this.http.post(`${this._url}/delete_account`,[user_email]);
    }

    recover_account(user_email:string){
        return this.http.post(`${this._url}/recover_account`,[user_email]);
    }
}
