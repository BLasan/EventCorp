import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DeleteAccountService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }

    delete_account(user_data:string){
        return this.http.post(`${this._url}/delete_account`,[user_data]);
    }
}
