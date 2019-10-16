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

    mark_viewed_notifications(sender_email:string,user_name:string,notification_type:string){
        return this.http.post(`${this._url}/mark_view_notifications`,[sender_email,user_name,notification_type]);
    }

    get_message_notifications(organizer:string){
        return this.http.post(`${this._url}/get_all_message_notifications`,[organizer]);
    }

    getNotificationCount(organizer:string){
        return this.http.post(`${this._url}/get_notification_count`,[organizer]);
    }
}

