import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import { messaging } from 'firebase';
import { httpify } from 'caseless';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private http:HttpClient){}

    private socket=io('http://localhost:4600');
    private _url: string = "http://localhost:4600";

    joinRoom(data){
        this.socket.emit('join',data);
    }

    sendMessage(message:string="Welcome"){
        this.socket.emit('chat',message);
    }

    newUserJoined(){
        console.log('initial');

        let observable=new Observable<{user:String,message:String,date:Date}>(observer=>{
            this.socket.on('new user',(data)=>{
                console.log(data);
                observer.next(data);
            });
            return ()=> {this.socket.disconnect()}
        });

        return observable;
    }

    sendNotification(receiver:string,sender:string,roomId:number,date:any,searched_user_name:string,organizer:string,message:string){
        return this.http.post(`${this._url}/send_notification`,[sender,receiver,roomId,date,searched_user_name,organizer,message]);
    }

    sendNotifications(receiver:string,sender:string,date:any,searched_user_name:string,organizer:string,message:any){
        return this.http.post(`${this._url}/send_notifications`,[sender,receiver,date,searched_user_name,organizer,message]);
    }

    getActiveStatus(user:string){
        return this.http.post(`${this._url}/get_status`,[user]);
    }

    loadAllChats(user_name:string){
        return this.http.post(`${this._url}/get_all_chats`,[user_name]);
    }
}
