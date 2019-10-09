import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/services/chat.service';
import { disable_open_chat,disable_close_chat} from '../../../scripts/disable_a_href';
import {generate_chat_id} from '../../../scripts/generate_id';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.component.html',
  styleUrls: ['./my-chats.component.scss']
})
export class MyChatsComponent implements OnInit {

  chats:any;
  chat_user_name:string;
  user:string;
  messageArray:Array<{user:String,message:String,date:Date}>=[];
  isOpened:boolean=false;
  active_status: any;
  message:string;
  chat_user_email:string;
  constructor(private _chat:ChatService,private _snackbar:MatSnackBar) { }

  ngOnInit() {
    this.user=localStorage.getItem('nameId');
    this.loadAllChats();
  }

  loadAllChats(){
    let user_name=localStorage.getItem('user_name');
    this._chat.loadAllChats(user_name).subscribe(data=>{
      console.log(data);
      this.chats=data;
      console.log(this.chats[0].message);
      for(var chat of this.chats){
        for(var message of chat.message)  this.messageArray.push(message)
      }
      //for(var i=0;i<this.chats.message.length;i++) this.messageArray.push(this.chats.message[i])
      console.log(this.messageArray+"->Message");
    })
  }

  open_selected_chat(user:string,roomId:string,chat_user_name:string){
    //alert('hello')
    disable_open_chat();
    console.log(user+"-"+roomId+"-"+chat_user_name);
    this.chat_user_name=chat_user_name;
    this.chat_user_email=user;
    let user_name=localStorage.getItem('nameId');
    let date=new Date();
    let room_id=roomId;
    this._chat.joinRoom({user:user_name,room:room_id,message:"Hello",date:date});
    this.isOpened=true;
  }

  sendMessage(){

    let room_id=generate_chat_id(localStorage.getItem('user_name'),new Date(),this.chat_user_email);
    let date=new Date();
    this._chat.getActiveStatus(this.chats[0].receiver_email).subscribe(data=>{
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
    this._chat.joinRoom({user:this.user,room:room_id,message:this.message});
    this.message=" ";
  }

  closeChat(){
    disable_close_chat();
    this.isOpened=false;
    let date=new Date();
    let message_details:any;
    this._chat.sendNotifications(this.chat_user_email,localStorage.getItem('user_name'),date,this.chat_user_name,localStorage.getItem('nameId'),this.messageArray).subscribe(data=>{
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

}
