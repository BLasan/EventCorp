import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/services/chat.service';
import { disable_open_chat} from '../../../scripts/disable_a_href';
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
  constructor(private _chat:ChatService) { }

  ngOnInit() {
    this.user=localStorage.getItem('nameId');
    this.loadAllChats();
  }

  loadAllChats(){
    let user_name=localStorage.getItem('user_name');
    this._chat.loadAllChats(user_name).subscribe(data=>{
      console.log(data);
      this.chats=data;
      let message_temp_array:Array<{user:String,message:String,date:Date}>=[];
      message_temp_array=this.chats.message;
      console.log(this.chats[0].message);
      for(var chat of this.chats){
        for(var message of chat.message)  this.messageArray.push(message)
      }
      //for(var i=0;i<this.chats.message.length;i++) this.messageArray.push(this.chats.message[i])
      console.log(this.messageArray+"->Message");
    })
  }

  open_selected_chat(user:string,roomId:string,chat_user_name:string){
    alert('hello')
    disable_open_chat();
    console.log(user+"-"+roomId+"-"+chat_user_name);
    this.chat_user_name=chat_user_name;
    let user_name=localStorage.getItem('nameId');
    let date=new Date();
    let room_id=roomId;
    this._chat.joinRoom({user:user_name,room:room_id,message:"Hello",date:date});
    this.isOpened=true;
  }

}
