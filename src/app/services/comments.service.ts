import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }

    add_comment(comment:any,user_email:any,user_name:any,timeStamp:any){
        return this.http.post(`${this._url}/add_comment`,{comment:comment,user_email:user_email,user_name:user_name,timeStamp:timeStamp});
    }

    load_comment(user_email:any){
        return this.http.get(`${this._url}/load_comment/${user_email}`);
    }
}
