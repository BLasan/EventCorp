import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private _url: string = "http://localhost:4600";
    
    constructor(private http: HttpClient) { }
    get_booking_details(organizer:string){
        return this.http.post(`${this._url}/get_all_booking_notifications`,[organizer]);
    }

    mark_viewed_notifications(receiver_email:string,user_name:string){
        return this.http.post(`${this._url}/mark_view_notifications`,[receiver_email,user_name]);
    }
}

