import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {open_chat,close_chat} from '../../../scripts/online_chat';
import { ChatService } from 'app/services/chat.service';

@Component({
  selector: 'app-online-chat',
  templateUrl: './online-chat.component.html',
  styleUrls: ['./online-chat.component.scss'],
})
export class OnlineChatComponent implements OnInit {

  @Input() user_auth: string ;

  // messagesCollection: AngularFirestoreCollection<any>;
  // messages: Observable<any>;
  // count:number=0;
  user:String;
  room:String;
  message:string="Welcome";
  messageArray:Array<{user:String,message:String}>=[];

  constructor(private afs: AngularFirestore,private chat_service:ChatService) {
    
   }

  ngOnInit() {
    this.user=this.user_auth;
    console.log(this.user_auth)
    // this.getChatData();
    this.chat_service.newUserJoined().subscribe(data=>{
      // console.log(data)
      this.messageArray.push(data);
    });
  }

  join(){
    console.log(this.user);
    this.room=this.createRoom();
    this.chat_service.joinRoom({user:this.user,room:this.room,message:this.message});
  }



  // getChatData() {
	//   this.messagesCollection = this.afs.collection<any>('chat_messages');
  //     this.messages = this.messagesCollection.valueChanges();
  //     console.log(this.messages)
  // }

  // newMessage(message) {
  //   console.log(message)
  //   this.count+=1;
  //   var obj={message:message}
  //   var id_message=this.count.toString();
	//   this.messagesCollection.doc(id_message).set(obj);
  // }

  openChat(){
    open_chat();
    this.join();
  }

  closeChat(){
    close_chat()
  }

  createRoom(){
    var organizer=localStorage.getItem('user_token');
    var searched_role=this.user;
    var room_id=organizer+"%"+searched_role;
    return room_id;
  }

  sendMessage(){
    console.log(this.message);
    this.chat_service.joinRoom({user:this.user,room:this.room,message:this.message});
  }

}
