import { Component, OnInit, Input } from '@angular/core';
import {open_chat,close_chat} from '../../../scripts/online_chat';
import { MatSnackBar } from '@angular/material';
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
  searched_user_image:any;
  sender_image:any;
  constructor(private _snackbar:MatSnackBar,private database:AngularFirestore) {
    
   }

  ngOnInit() {
    // this.user=this.user_auth;
    this.user=localStorage.getItem('user_name');
    //alert(this.user);

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

    this.getImages();            //get user images
    this.realtime_listen();      //realtime listen
  }


  //get user images
  getImages(){
    var _this=this;
    let sender=localStorage.getItem('user_name');
    this.database.firestore.collection('register_user').get().then(docs=>{
      if(!docs.empty){
        docs.forEach(doc=>{
          if(doc.id===_this.searched_user) _this.searched_user_image=doc.data().image_url;
          else if(doc.id===sender) _this.sender_image=doc.data().image_url;
        })
      }
    })
  }


  //send message 
  sendMessage(){
    var _this=this;
    let date=new Date();
    let time_date=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    this.messageArray.push({user:localStorage.getItem('user_name'),message:_this.message,date:time_date});

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
            console.log(_this.messageArray[0].user===_this.user)
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

}
