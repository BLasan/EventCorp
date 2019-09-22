import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RateUserService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }

    rate_user(rating:any,email:any){
        return this.http.post(`${this._url}/add_rating`,{rating:rating,email:email});
    }

    load_ratings(email:any){
        // console.log(token);
        return this.http.get(`${this._url}/load_user_ratings/${email}`);
    }
    
}
