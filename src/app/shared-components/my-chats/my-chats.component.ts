import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/services/chat.service';
import { disable_open_chat,disable_close_chat} from '../../../scripts/disable_a_href';
import {generate_chat_id} from '../../../scripts/generate_id';
import { MatSnackBar } from '@angular/material';
import {deactivate_searchBar} from '../../../scripts/search_bar_activate';
import { AngularFirestore } from '@angular/fire/firestore';
import sha1 from 'sha1';
@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.component.html',
  styleUrls: ['./my-chats.component.scss']
})
export class MyChatsComponent implements OnInit {

  chats:any=[];
  chat_user_name:string;
  user:string;
  messageArray:Array<{user:String,message:String,date:Date}>=[];
  isOpened:boolean=false;
  active_status: any;
  message:string;
  chat_user_email:string;
  isOrganizer:boolean=false;
  constructor(private _chat:ChatService,private _snackbar:MatSnackBar,private database:AngularFirestore) { }

  ngOnInit() {
    deactivate_searchBar();
    this.user=localStorage.getItem('nameId');
    this.loadAllChats();
  //   this._chat.newUserJoined().subscribe(data=>{
  //     console.log(data+"Data")
  //     this.messageArray.push(data);
  //  });
  }

  loadAllChats(){
    var _this=this;
    let user_name=localStorage.getItem('user_name');
    let user_role=localStorage.getItem('role');
    var docRef = this.database.firestore.collection('chats');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if((doc.data().sender_email==user_name) && user_role=='organizer')
      _this.chats.push(doc.data());
      else if(doc.data().receiver_email==user_name && user_role!='organizer')
      _this.chats.push(doc.data());
    });
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });
    // this._chat.loadAllChats(user_name,user_role).subscribe(data=>{
    //   console.log(data);
    //   this.chats=data;
    //   //alert(this.chats[0].organizer)
    //   console.log(this.chats[0].message);
    //   //for(var i=0;i<this.chats.message.length;i++) this.messageArray.push(this.chats.message[i])
    //   console.log(this.messageArray+"->Message");
    //})
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
    if(localStorage.getItem('role')=='organizer'){
    this.isOrganizer=true;
    for(var chat of this.chats.filter(x=>x.receiver_name==chat_user_name)){
      for(var message of chat.message)  this.messageArray.push(message)
    }
    }
    else{
      for(var chat of this.chats.filter(x=>x.sender_name==chat_user_name)){
        for(var message of chat.message)  this.messageArray.push(message)
      }
    }

    console.log(this.messageArray[0].message+"->MESSAGE")
  }


  sendMessage(){
    var _this=this;
    let room_id=generate_chat_id(localStorage.getItem('user_name'),new Date(),this.chat_user_email);
    let date=new Date();
    alert(localStorage.getItem('user_name'))
    var docRef = this.database.firestore.collection('register_user').doc(this.chat_user_email);
    docRef.get().then(function(doc) {
        console.log("UseData:"+doc.data().role)
        if(doc.data()){
            _this.active_status=doc.data().active_status;
            if(_this.active_status=="logout"){
              let chat_id=_this.generate_id(_this.chat_user_email);

              var notifications= _this.database.collection('chats').doc(chat_id).set({receiver_name:_this.chat_user_name,date:date,sender_name:_this.user,roomId:chat_id,message:_this.messageArray,receiver_email:_this.chat_user_email,sender_email:localStorage.getItem('user_name'),organizer:localStorage.getItem('role')}).then(function(){
                // if(localStorage.getItem('role')=='organizer')
                var receiver_notifications=_this.database.collection('register_user').doc(_this.chat_user_email).collection('notification-messages').doc(localStorage.getItem('user_name')).set({receiver_name:_this.chat_user_name,date:date,sender_name:_this.user,sender_email:localStorage.getItem('user_name'),roomId:chat_id,view:false});
                console.log(notifications);
                if(receiver_notifications){ 
                  _this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
                    duration: 3000,
                  });
                }
                else{
                    console.log("Fail to send message");
                }
              }).catch(function(error){
                console.log("Error"+error);
              })
            }
        }
        else{
            console.log("No documents")
        }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    // this._chat.getActiveStatus(this.chats[0].receiver_email).subscribe(data=>{
    //   let datas:any=data;
    //  // console.log(datas.status+":DATAS")
    //   this.active_status=datas.status;
    //   // if(this.active_status=="logout"){
    //   //   let message_details:any;
    //   //   this.chat_service.sendNotification(this.searched_user,this.viewer,room_id,date,this.searched_user_name,this.organizer,this.message).subscribe(data=>{
    //   //     message_details=data;
    //   //     console.log("STATUS:"+message_details.success)
    //   //     if(message_details.success){
    //   //       this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
    //   //         duration: 3000,
    //   //       });
    //   //     }
    //   //     else{
    //   //       this._snackbar.open("Message sending error","OK", {
    //   //         duration: 3000,
    //   //       });
    //   //     }
    //   //   })
    //   // }
    // })

    this.messageArray.push({user:this.user,message:this.message,date:date});
    console.log(this.messageArray);
    this._chat.joinRoom({user:this.user,room:room_id,message:this.message});
    this.message=" ";
  }

  closeChat(){
    disable_close_chat();
    this.isOpened=false;
    var _this=this;
    let date=new Date();
   // let message_details:any;
    if(localStorage.getItem('role')=='organizer'){
   // let isOrganizer='organizer';
    var docRef = this.database.firestore.collection('register_user').doc(this.chats[0].receiver_email);
    docRef.get().then(function(doc) {
        console.log("UseData:"+doc.data().role)
        if(doc.data()){
            _this.active_status=doc.data().active_status;
            if(_this.active_status=="logout"){
              let chat_id=_this.generate_id(_this.chat_user_email);
              alert(chat_id)
              var notifications= _this.database.collection('chats').doc(chat_id).set({receiver_name:_this.chat_user_name,date:date,sender_name:_this.user,roomId:chat_id,message:_this.messageArray,receiver_email:_this.chat_user_email,sender_email:localStorage.getItem('user_name'),organizer:localStorage.getItem('role')}).then(function(){
                if(localStorage.getItem('role')=='organizer')
                var receiver_notifications=_this.database.collection('register_user').doc(_this.chat_user_email).collection('notification-messages').doc(localStorage.getItem('user_name')).set({receiver_name:_this.chat_user_name,date:date,sender_name:_this.user,sender_email:localStorage.getItem('user_name'),roomId:chat_id,view:false});
                console.log(notifications);
                if(receiver_notifications){ 
                  _this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
                    duration: 3000,
                  });
                }
                else{
                    console.log("Fail to send message");
                }
              }).catch(function(error){
                console.log("Error"+error);
              })
            }
        }
        else{
            console.log("No documents")
        }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    // this._chat.sendNotifications(this.chat_user_email,localStorage.getItem('user_name'),date,this.chat_user_name,localStorage.getItem('nameId'),this.messageArray,isOrganizer).subscribe(data=>{
    //   message_details=data;
    //   console.log("STATUS:"+message_details.success)
    //   if(message_details.success){
    //     this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
    //       duration: 3000,
    //     });
    //   }
    //   else{
    //     this._snackbar.open("Message sending error","OK", {
    //       duration: 3000,
    //     });
    //   }
      this.messageArray=[];
    // });
  }
    else if(localStorage.getItem('role')!='organizer'){
    let isOrganzier='non-organizer';
    var docRef = this.database.firestore.collection('register_user').doc(_this.chat_user_email);
    docRef.get().then(function(doc) {
        console.log("UseData:"+doc.data().role)
        if(doc.data()){
            _this.active_status=doc.data().active_status;
            if(_this.active_status=="logout"){
              let chat_id=_this.generate_id(_this.chat_user_email);
              var notifications= _this.database.collection('chats').doc(chat_id).set({sender_name:_this.chat_user_name,date:date,receiver_name:_this.user,roomId:chat_id,message:_this.messageArray,sender_email:_this.chat_user_email,receiver_email:localStorage.getItem('user_name'),organizer:localStorage.getItem('role')}).then(function(){
                // if(localStorage.getItem('role')=='organizer')
                var receiver_notifications=_this.database.collection('register_user').doc(_this.chat_user_email).collection('notification-messages').doc(_this.chat_user_email).set({sender_name:_this.chat_user_name,date:date,receiver_name:_this.user,sender_email:localStorage.getItem('user_name'),roomId:chat_id,view:false});
                console.log(notifications);
                if(receiver_notifications){ 
                  _this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
                    duration: 3000,
                  });
                }
                else{
                    console.log("Fail to send message");
                }
              }).catch(function(error){
                console.log("Error"+error);
              })
            }
        }
        else{
            console.log("No documents")
        }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    // this._chat.sendNotifications(localStorage.getItem('user_name'),this.chat_user_email,date,localStorage.getItem('nameId'),this.chat_user_name,this.messageArray,isOrganzier).subscribe(data=>{
    //   message_details=data;
    //   console.log("STATUS:"+message_details.success)
    //   if(message_details.success){
    //     this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
    //       duration: 3000,
    //     });
    //   }
    //   else{
    //     this._snackbar.open("Message sending error","OK", {
    //       duration: 3000,
    //     });
    //   }
    //   this.messageArray=[];
    // });
    this.messageArray=[];
  }
  }

  generate_id(chat_user_email){
    let id=localStorage.getItem('user_name')+"@"+chat_user_email;
    let hash=sha1(id);
    return hash;
  }
}
