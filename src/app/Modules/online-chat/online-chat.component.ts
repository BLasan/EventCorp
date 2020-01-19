import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {open_chat,close_chat} from '../../../scripts/online_chat';
import { ChatService } from 'app/services/chat.service';
import { MatSnackBar } from '@angular/material';
import {generate_chat_id} from '../../../scripts/generate_id';
import { database } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import CryptoJS from 'crypto-js';
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
  hashed_id:any;
  message:string="Welcome to the LIVE CHAT";
  active_status:string;
  showChat:boolean=false;
  messageArray:Array<{user:String,message:String,date:any}>=[];
  senderArray:Array<{user:String,message:String}>=[];
  constructor(private _snackbar:MatSnackBar,private database:AngularFirestore) {
    
   }

  ngOnInit() {
    // this.user=this.user_auth;
    this.user=this.organizer;
    alert(this.user);

    //create chat id according to the users
    if(localStorage.getItem('role')==='organizer'){
      var chat_id=localStorage.getItem('user_name')+"@"+this.searched_user
      this.hashed_id=CryptoJS.SHA256(chat_id).toString();
    }
    else if(localStorage.getItem('role')!=='organizer'){
      var chat_id=this.searched_user+"@"+localStorage.getItem('user_name');
      this.hashed_id=CryptoJS.SHA256(chat_id).toString();
    }
    else if(localStorage.getItem('role')=='admin'){
      var chat_id=this.searched_user+"@"+localStorage.getItem('user_name');
      this.hashed_id=CryptoJS.SHA256(chat_id).toString();
    }
    else if(localStorage.getItem('role')=='moderator'){
      var chat_id=this.searched_user+"@"+localStorage.getItem('user_name');
      this.hashed_id=CryptoJS.SHA256(chat_id).toString();
    }

    // this.get_searched_user_status();

    this.realtime_listen();      //realtime listen

    // if(localStorage.getItem('role')==="organizer")
    // this.room=generate_chat_id(localStorage.getItem('user_name'),new Date(),this.searched_user);
    // else
    // this.room=generate_chat_id(this.searched_user,new Date(),localStorage.getItem('user_name'));

    // this.chat_service.newUserJoined().subscribe(data=>{
    //   console.log(data+"========>Data")
    //   this.messageArray.push(data);
    // });
    // this.get_searched_user_status();
  }


  //send message 
  sendMessage(){
    var _this=this;
    let date=new Date();
    let time_date=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getTime();
   
    this.messageArray.push({user:_this.user,message:_this.message,date:time_date});

    //update the message to database
    this.database.collection('chats').doc(this.hashed_id).set({sender:localStorage.getItem('user_name'),message:this.messageArray}).then(()=>{
      _this.message="";
      _this.realtime_listen()
    }).catch(err=>{
      console.log(err);
    });


    //update notifications
    this.database.collection('register_user').doc(this.searched_user).collection('chats').doc(localStorage.getItem('user_name')).set({sender:localStorage.getItem('user_name'),date:time_date,message:"1 New Message from ",view:false,chat_id:this.hashed_id,user_name:this.searched_user_name}).then(()=>{
      console.log("Success");
    }).catch(err=>{
      console.log(err);
    });

  }


  //realtime listen
  realtime_listen(){
    var _this=this;
    this.database.firestore.collection('chats').onSnapshot(function(snapshot){
      let changes=snapshot.docChanges();
      changes.forEach(docs=>{
        if(docs.doc.id===_this.hashed_id){
          if(docs.type==="added"){
            _this.messageArray=docs.doc.data().message;
            console.log(_this.messageArray)
          }
          else if(docs.type==="modified"){
            _this.messageArray=docs.doc.data().message;
          }
          else if(docs.type==="removed"){
  
          }
        }
      })
    });


    //get the active status of the users
    this.database.firestore.collection('register_user').onSnapshot(function(snapshot){
      let changes=snapshot.docChanges();
      console.log(_this.searched_user)
      changes.forEach(docs=>{
        if(docs.doc.id===_this.searched_user){
          if(docs.type==="added"){
            if((docs.doc.data().role==="organizer" && localStorage.getItem('role')!="organizer") || (docs.doc.data().role!="organizer" && localStorage.getItem('role')==="organizer"))
            _this.showChat=true;
            else if((localStorage.getItem('role')=="admin") || (docs.doc.data().role=="moderator" && localStorage.getItem('role')==="organizer"))
            _this.showChat=true;
            _this.active_status=docs.doc.data().active_status;
            console.log(_this.active_status);
          }
          else if(docs.type==="modified"){
            if((docs.doc.data().role==="organizer" && localStorage.getItem('role')!="organizer") || (docs.doc.data().role!="organizer" && localStorage.getItem('role')==="organizer"))
            _this.showChat=true;
            else if((localStorage.getItem('role')=="admin") || (docs.doc.data().role=="moderator" && localStorage.getItem('role')==="organizer"))
            _this.showChat=true;
            _this.active_status=docs.doc.data().active_status;
            console.log(_this.active_status)
          }
          else if(docs.type==="removed"){
  
          }
        }
      })
    });


}


//open chat module
openChat(){
    open_chat();
    var _this=this;
    this.message="";
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('chats').doc(this.searched_user).get().then((doc)=>{
      if(!doc.exists) console.log("Error Updating");
      else{
        _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('chats').doc(this.searched_user).update({view:true});
      }
    })
}


closeChat(){
  close_chat();
 
}

  // join(){
  //   console.log(this.user);
  //   console.log("Organizer"+this.organizer+" Receiver"+this.searched_user);
  //   // if(localStorage.getItem('role')==="organizer")
  //   // this.room=generate_chat_id(localStorage.getItem('user_name'),new Date(),this.searched_user);
  //   // else
  //   // this.room=generate_chat_id(this.searched_user,new Date(),localStorage.getItem('user_name'));
  //   this.chat_service.joinRoom({user:this.user,room:this.room,message:this.message,date:new Date()});
  // }

  
  // get_searched_user_status(){
  //   var _this=this;
  //   console.log(this.searched_user);
  //   this.database.firestore.collection('register_user').doc(this.searched_user).get().then(doc=>{
  //     // console.log(_this.searched_user+"->"+doc.data().role);
  //     _this.active_status=doc.data().active_status;
  //     if((doc.data().role==="organizer" && localStorage.getItem('role')!="organizer") || (doc.data().role!="organizer" && localStorage.getItem('role')==="organizer"))
  //      _this.showChat=true;
  //   }).catch(err=>{
  //     console.log(err);
  //   });
  // }



  // // getChatData() {
	// //   this.messagesCollection = this.afs.collection<any>('chat_messages');
  // //     this.messages = this.messagesCollection.valueChanges();
  // //     console.log(this.messages)
  // // }

  // // newMessage(message) {
  // //   console.log(message)
  // //   this.count+=1;
  // //   var obj={message:message}
  // //   var id_message=this.count.toString();
	// //   this.messagesCollection.doc(id_message).set(obj);
  // // }

  // openChat(){
  //   open_chat();
  //   this.join();
  //   this.message="";
  // }

  // closeChat(){
  //   close_chat();
  //   var _this=this;
  //  // let room_id=this.createRoom();
  //   let date=new Date();
  //   let message_details:any;
  //   // this.chat_service.sendNotifications(this.searched_user,this.viewer,date,this.searched_user_name,this.organizer,this.messageArray).subscribe(data=>{
  //   //   message_details=data;
  //   //   console.log("STATUS:"+message_details.success)
  //   //   if(message_details.success){
  //   //     this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
  //   //       duration: 3000,
  //   //     });
  //   //   }
  //   //   else{
  //   //     this._snackbar.open("Message sending error","OK", {
  //   //       duration: 3000,
  //   //     });
  //   //   }
  //   // });

  //   if(localStorage.getItem('role')=='organizer'){
  //     let isOrganizer='organizer';
  //    // alert(this.viewer);
  //     const chat_id=generate_chat_id(localStorage.getItem('user_name'),date,this.searched_user);
  //     this.database.firestore.collection('chats').doc(chat_id).set({receiver_name:this.searched_user_name,date:date,sender_name:localStorage.getItem('nameId'),roomId:chat_id,message:this.messageArray,receiver_email:this.searched_user,sender_email:localStorage.getItem('user_name'),organizer:isOrganizer}).then(function(){
  //     var receiver_notifications=_this.database.collection('register_user').doc(_this.searched_user).collection('notification-messages').doc(localStorage.getItem('user_name')).set({receiver_name:_this.searched_user_name,date:date,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),roomId:chat_id,view:false});
  //       if(receiver_notifications){ 
  //         _this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
  //           duration: 3000,
  //         });
  //       }
  //       else{
  //         _this._snackbar.open("Message sending error","OK", {
  //           duration: 3000,
  //         });
  //       }
  //       _this.messageArray=[];
  //       }).catch(function(error){
  //         console.log("Error"+error);
  //         _this._snackbar.open("Message sending error","OK", {
  //           duration: 3000,
  //         });
  //         _this.messageArray=[];
  //       })

  //     // this.chat_service.sendNotifications(this.searched_user,localStorage.getItem('user_name'),date,this.searched_user_name,localStorage.getItem('nameId'),this.messageArray,isOrganizer).subscribe(data=>{
  //     //   message_details=data;
  //     //   console.log("STATUS:"+message_details.success)
  //     //   if(message_details.success){
  //     //     this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
  //     //       duration: 3000,
  //     //     });
  //     //   }
  //     //   else{
  //     //     this._snackbar.open("Message sending error","OK", {
  //     //       duration: 3000,
  //     //     });
  //     //   }
  //     //   this.messageArray=[];
  //     // });

  //   }
  //     else if(localStorage.getItem('role')!='organizer'){
  //     let isOrganizer='non-organizer';
  //    // alert(this.searched_user)
  //     const chat_id=generate_chat_id(this.searched_user,date,localStorage.getItem('user_name'));
  //    // alert(this.searched_user_name); 
  //     this.database.collection('chats').doc(chat_id).set({receiver_name:localStorage.getItem('nameId'),date:date,sender_name:this.searched_user_name,roomId:chat_id,message:this.messageArray,receiver_email:localStorage.getItem('user_name'),sender_email:this.searched_user,organizer:isOrganizer}).then(function(){
  //     var receiver_notifications=_this.database.collection('register_user').doc(_this.searched_user).collection('notification-messages').doc(localStorage.getItem('user_name')).set({receiver_name:_this.searched_user_name,date:date,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),roomId:chat_id,view:false});
  //       if(receiver_notifications){ 
  //         _this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
  //           duration: 3000,
  //         });
  //       }
      
  //       else{
  //         this._snackbar.open("Message sending error","OK", {
  //           duration: 3000,
  //         });
  //       }
  //       _this.messageArray=[];

  //     }).catch(function(error){
  //       console.log("Error"+error);
  //       this._snackbar.open("Message sending error","OK", {
  //         duration: 3000,
  //       });
  //       _this.messageArray=[];
  //     })
    
  //     // this.chat_service.sendNotifications(localStorage.getItem('user_name'),this.searched_user,date,localStorage.getItem('nameId'),this.searched_user_name,this.messageArray,isOrganzier).subscribe(data=>{
  //     //   message_details=data;
  //     //   console.log("STATUS:"+message_details.success)
  //     //   if(message_details.success){
  //     //     this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
  //     //       duration: 3000,
  //     //     });
  //     //   }
  //     //   else{
  //     //     this._snackbar.open("Message sending error","OK", {
  //     //       duration: 3000,
  //     //     });
  //     //   }
  //     //   this.messageArray=[];
  //     // });
  //   }
  // }

  // // createRoom(){
  // //   // var organizer=localStorage.getItem('user_token');

  // //   var organizer=this.viewer;
  // //   var searched_role=this.searched_user;
  // //   var room_id=this.generateRoomId(organizer,searched_role);
  // //   return room_id;
  // // }

  // sendMessage(){
  //   var _this=this;
  //   if(localStorage.getItem('role')==="organizer")
  //   var room_id=generate_chat_id(localStorage.getItem('user_name'),new Date(),this.searched_user);
  //   else
  //   var room_id=generate_chat_id(this.searched_user,new Date(),localStorage.getItem('user_name'));
  //   let date=new Date();
  //   var docRef =this.database.firestore.collection('register_user').doc(this.searched_user);
  //   docRef.get().then(function(doc) {
  //       console.log("UseData:"+doc.data().role)
  //       if(doc.data()){
  //          _this.active_status=doc.data().active_status;
  //       }
  //       else{
  //           alert("Empty Data");
  //       }

  //       _this.messageArray.push({user:_this.user,message:_this.message,date:date});
  //       alert(_this.message);
  //       _this.chat_service.joinRoom({user:_this.user,room:room_id,message:_this.message});
  //       _this.message=" ";
     
        
  //   }).catch(function(error) {
  //     console.log("Error getting document:", error);
  //   });

  //   // this.chat_service.getActiveStatus(this.searched_user).subscribe(data=>{
  //   //   let datas:any=data;
  //   //  // console.log(datas.status+":DATAS")
  //   //   this.active_status=datas.status;
  //   //   // if(this.active_status=="logout"){
  //   //   //   let message_details:any;
  //   //   //   this.chat_service.sendNotification(this.searched_user,this.viewer,room_id,date,this.searched_user_name,this.organizer,this.message).subscribe(data=>{
  //   //   //     message_details=data;
  //   //   //     console.log("STATUS:"+message_details.success)
  //   //   //     if(message_details.success){
  //   //   //       this._snackbar.open("User is offline.Your message has been sent successfully","OK", {
  //   //   //         duration: 3000,
  //   //   //       });
  //   //   //     }
  //   //   //     else{
  //   //   //       this._snackbar.open("Message sending error","OK", {
  //   //   //         duration: 3000,
  //   //   //       });
  //   //   //     }
  //   //   //   })
  //   //   // }
  //   // })

  // }

  // // generateRoomId(organzier,searched_user){
  // //   var string_concat=organzier+searched_user;
  // // //  string_concat=string_concat.toLocaleLowerCase();
  // //   console.log(string_concat);
  // //   var temp=0;
  // //   console.log(string_concat.length+":LENGTH")
  // //   for(var i=string_concat.length-1;i>=0;i--){
  // //     var char_code=string_concat.charCodeAt(i);
  // //    // console.log(char_code+":CHARCODE")
  // //     temp=temp+Math.pow(char_code,(string_concat.length-i));
  
  // //   }
  // //   console.log(temp+":TemP")
  // //   return temp;
  // // }

}
