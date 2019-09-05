import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {open_chat,close_chat} from '../../../scripts/online_chat';
import { ChatService } from 'app/services/chat.service';

@Component({
  selector: 'app-online-chat',
  templateUrl: './online-chat.component.html',
  styleUrls: ['./online-chat.component.scss']
})
export class OnlineChatComponent implements OnInit {

  // messagesCollection: AngularFirestoreCollection<any>;
  // messages: Observable<any>;
  // count:number=0;
  user:String;
  room:String;
  messageArray:Array<{user:String,message:String}>=[];

  constructor(private afs: AngularFirestore,private chat_service:ChatService) {
    
   }

  ngOnInit() {
    this.chat_service.newUserJoined().subscribe(data=>{
      console.log(data)
      this.messageArray.push(data);
    })
    // this.getChatData();
  }

  join(){
    console.log(this.user)
    this.chat_service.joinRoom({user:this.user,room:this.room})
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
  }

  closeChat(){
    close_chat()
  }

}
