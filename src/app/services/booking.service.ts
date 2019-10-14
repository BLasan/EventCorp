import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }

    book_user(searched_user:string,time:any,user:string){
        return this.http.post(`${this._url}/book_user`,[searched_user,time,user]);
    }

    get_booking_details(organzier:string,searched_user:string){
        return this.http.post(`${this._url}/get_all_bookings`,[searched_user,organzier]);
    }
}
