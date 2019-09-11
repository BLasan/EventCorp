import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import { messaging } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private socket=io('http://localhost:4600');

    joinRoom(data){
        this.socket.emit('join',data);
    }

    sendMessage(message:string="Welcome"){
        this.socket.emit('chat',message);
    }

    newUserJoined(){
        console.log('initial')
        let observable=new Observable<{user:String,message:String}>(observer=>{
            this.socket.on('new user',(data)=>{
                console.log(data);
                observer.next(data);
            });
            return ()=> {this.socket.disconnect()}
        });

        return observable;
    }
}
