import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {open_chat,close_chat} from '../../../scripts/online_chat';
import { ChatService } from 'app/services/chat.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-online-chat',
  templateUrl: './online-chat.component.html',
  styleUrls: ['./online-chat.component.scss'],
})
export class OnlineChatComponent implements OnInit {

  @Input() searched_user: string ;
  @Input() viewer: string ;
  @Input() organizer: string ;
  @Input() searched_user_name: string ;

  // messagesCollection: AngularFirestoreCollection<any>;
  // messages: Observable<any>;
  // count:number=0;
  user:String;
  room:number;
  message:string="Welcome";
  active_status:string;
  messageArray:Array<{user:String,message:String,date:Date}>=[];
  senderArray:Array<{user:String,message:String}>=[];
  constructor(private chat_service:ChatService,private _snackbar:MatSnackBar) {
    
   }

  ngOnInit() {
    // this.user=this.user_auth;
    this.user=this.organizer;
  
  //  console.log(this.user_auth)
    // this.getChatData();
    this.chat_service.newUserJoined().subscribe(data=>{
       console.log(data+"Data")
      this.messageArray.push(data);
    });
  }

  join(){
    console.log(this.user);
    this.room=this.createRoom();
    this.chat_service.joinRoom({user:this.user,room:this.room,message:this.message,date:new Date()});
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
    close_chat();
   // let room_id=this.createRoom();
    let date=new Date();
    let message_details:any;
    this.chat_service.sendNotifications(this.searched_user,this.viewer,date,this.searched_user_name,this.organizer,this.messageArray).subscribe(data=>{
      message_details=data;
      console.log("STATUS:"+message_details.success)
      if(message_details.success){
        this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
          duration: 3000,
        });
      }
      else{
        this._snackbar.open("Message sending error","OK", {
          duration: 3000,
        });
      }
    })
  }

  createRoom(){
    // var organizer=localStorage.getItem('user_token');

    var organizer=this.viewer;
    var searched_role=this.searched_user;
    var room_id=this.generateRoomId(organizer,searched_role);
    return room_id;
  }

  sendMessage(){
    let room_id=this.createRoom();
    let date=new Date();
    this.chat_service.getActiveStatus(this.searched_user).subscribe(data=>{
      let datas:any=data;
     // console.log(datas.status+":DATAS")
      this.active_status=datas.status;
      // if(this.active_status=="logout"){
      //   let message_details:any;
      //   this.chat_service.sendNotification(this.searched_user,this.viewer,room_id,date,this.searched_user_name,this.organizer,this.message).subscribe(data=>{
      //     message_details=data;
      //     console.log("STATUS:"+message_details.success)
      //     if(message_details.success){
      //       this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
      //         duration: 3000,
      //       });
      //     }
      //     else{
      //       this._snackbar.open("Message sending error","OK", {
      //         duration: 3000,
      //       });
      //     }
      //   })
      // }
    })

    this.messageArray.push({user:this.user,message:this.message,date:date});
    console.log(this.message);
    this.chat_service.joinRoom({user:this.user,room:room_id,message:this.message});
    this.message=" ";
  }

  generateRoomId(organzier,searched_user){
    var string_concat=organzier+searched_user;
  //  string_concat=string_concat.toLocaleLowerCase();
    console.log(string_concat);
    var temp=0;
    console.log(string_concat.length+":LENGTH")
    for(var i=string_concat.length-1;i>=0;i--){
      var char_code=string_concat.charCodeAt(i);
     // console.log(char_code+":CHARCODE")
      temp=temp+Math.pow(char_code,(string_concat.length-i));
  
    }
    console.log(temp+":TemP")
    return temp;
  }

}
