import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SearchUserService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }

    getUsers(user:any){
        return this.http.post(`${this._url}/load_users`,{user_role:user});
    }
}
