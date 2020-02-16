import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import {update_count} from 'scripts/update_notification_count';
import {disable_room_id} from '../../../scripts/disable_a_href';
import { ChatService } from 'app/services/chat.service';
import {generate_chat_id} from '../../../scripts/generate_id';
import { filter } from 'rxjs/operators';
import CryptoJS from 'crypto-js';
import { AngularFirestore } from '@angular/fire/firestore';
import { update_notification_count } from '../../../scripts/notification_count_update';
// import { pay} from 'scripts/payhere.js';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notification:string="This is a new notification";
  chat_messages:any=[];
  notification_details:any=[];
  booking_data:any=[];
  message_details:any;
  message_data:any=[];
  sent_bookings: boolean;
  updated_data:any;
  isUpdated:boolean;
  isBookingView:boolean=false;
  notification_checked:boolean=false;
  checked:boolean=false;
  notification_type:string;
  notification_count:number=0;
  user_role:string;
  filtered_details:any=[];
  req_from:string;
  req_time:any;
  req_email:any;
  req_name:string;
  req_status:string="";
  req_id:any="";
  eventName:string="";
  constructor(private _notification:NotificationService,private database:AngularFirestore) { }
  showNotification(from, align){
      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  ngOnInit() {
    this.getRequestDetails();
    this.getMessageNotifications();
    this.user_role=localStorage.getItem('role');
    //disable_room_id();
  }

  getRequestDetails(){
  console.log('Hello');
   // this.notification_count=0;
  var _this=this;
  let user_name=localStorage.getItem('user_name');
  var docRef = this.database.firestore.collection('register_user').doc(user_name).collection('bookings');
  docRef.get()
  .then(snapshot => {
  if (snapshot.empty) {
    console.log('No matching documents.');
    // isDone=true;
  }  
  snapshot.forEach(doc => {
    if(doc.data().view==false){
      console.log(doc.id, '=>', doc.data());
      var obj={_id:doc.id,data:doc.data()};
    // _this.notification_details.push(doc.data());
    _this.booking_data.push(obj);
    // _this.notification_count+=1;
    }
  });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

    // this._notification.get_booking_details(user_name).subscribe(data=>{
    //   this.notification_details=data;
    //   if(this.notification_details.isEmpty==false){
    //     this.booking_data=this.notification_details.data;
    //     console.log(this.booking_data);
    //     this.notification_count+=this.booking_data.length;
    //   }
    //   else this.notification_count=0;

    // //  localStorage.setItem('notification_count',this.notification_count.toString());
    // })
}

  getMessageNotifications(){
   // this.notification_count=0;
    let user_name=localStorage.getItem('user_name');
    var _this=this;
    var docRef = this.database.firestore.collection('register_user').doc(user_name).collection('notification-messages');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
    }  
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if(doc.data().view==false)
      _this.message_data.push(doc.data());
      // _this.notification_count+=1;
    });
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  var docRef = this.database.firestore.collection('register_user').doc(user_name).collection('chats');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
    }  
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if(doc.data().view==false)
      _this.chat_messages.push(doc.data());
      // _this.notification_count+=1;
    });
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });

    // this._notification.get_message_notifications(user_name).subscribe(data=>{
    //   this.notification_details=data;
    //   if(this.notification_details.isEmpty==false){
    //     this.message_data=this.notification_details.data;
    //     console.log(this.message_data);
    //     this.notification_count+=this.message_data.length;
    //   }
    //   else this.notification_count=0;
    //  // localStorage.setItem('notification_count',this.notification_count.toString());
    // })
    
   }

mark_view_booking_notification(sender_email:string,type:string){
//  alert(sender_email)
 let count=document.getElementById('notification_count_id').innerHTML.toString();   //get current notification count
 let _count=parseInt(count)-1;
 console.log(_count);
 let _id=document.getElementById('notification_count_id');

  if(type==='req'){
    if(this.isBookingView){
      alert(sender_email)
      console.log(this.booking_data);
      if(localStorage.getItem('role')==='organizer'){
        this.filtered_details=this.booking_data.filter(x=>x.user_email!==sender_email);
        this.req_from=this.filtered_details[0].user_email;
        this.req_name=this.filtered_details[0].user_name;
        this.req_time=this.filtered_details[0].date;
      }
      else{
        this.filtered_details=this.booking_data.filter(x=>x.sender_email!==sender_email);
        this.req_from=this.filtered_details[0].sender_email;
        this.req_name=this.filtered_details[0].sender_name;
        this.req_time=this.filtered_details[0].date;
      }
      // this.req_contact=this.filtered_details[0].user_contact;
    }
  
    if(!this.isBookingView){
      console.log(this.message_data);
      this.filtered_details=this.message_data.filter(x=>x.sender_email!==sender_email);
      this.req_from=this.filtered_details[0].sender_email;
      this.req_name=this.filtered_details[0].sender_name;
      this.req_time=this.filtered_details[0].date; 
    }
  }

  let user_name=localStorage.getItem('user_name');
  var _this=this;
 // this.notification_count-=1;
  console.log(sender_email)
  if(this.isBookingView) this.notification_type="booking";
  else this.notification_type="notifications";

  //filter non viewed bookings
  if(this.notification_type==="booking" && type==='cancel'){
    var mark_notifications=this.database.collection('register_user').doc(user_name).collection('bookings').doc(sender_email).update({view:true}).then(()=>{
      _this.booking_data=_this.booking_data.filter(x=> x.data.view===false);
      if(_count>0){
        
        _id.innerHTML=_count.toString();
      }
      else if(_count===0) _id.setAttribute('style','display:none');
    }).catch(ex=>{
      console.log(ex);
    })
  }
  
  else
  var mark_notifications=this.database.collection('register_user').doc(user_name).collection('notification-messages').doc(sender_email).update({view:true}).then(()=>{
    _this.message_data=_this.message_data.filter(x=> x.view===false);
    if(_count>0)
    _id.innerHTML=_count.toString();
    else if(_count===0) _id.setAttribute('style','display:none');
  }).catch(err=>{
    console.log(err);
  })

  // if(mark_notifications){
  //   this.notification_count-=1;
  //   update_count(this.notification_count);
  //   this.getRequestDetails();
  // }

  // else{
  //   console.log("Not Updated")
  // }


  // this._notification.mark_viewed_notifications(sender_email,user_name,this.notification_type).subscribe(data=>{
  //   this.updated_data=data;
  //   this.notification_count-=1;
  //   this.isUpdated=this.updated_data.updated;
  //   if(this.isUpdated){
  //     console.log('Updated successfully');
  //     //this.navbar.update_count(this.notification_count);
  //     this.getRequestDetails();

  //   }
  //   else{
  //     console.log('Not upldated');
  //   }
  //  // localStorage.setItem('notification_count',this.notification_count.toString());
  // });
  
}


mark_chat_notifications(id:string){
  alert(id);
  let count=document.getElementById('notification_count_id').innerHTML.toString();   //get current notification count
  let _count=parseInt(count)-1;
  console.log(_count);
  let _id=document.getElementById('notification_count_id');
  // update_notification_count(_count);   //update notification count

  this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('chats').doc(id).update({view:true}).then(()=>{
    //update count
    if(_count>0) _id.innerHTML=_count.toString();   
    else if(_count===0) _id.setAttribute('style','display:none');
  }).catch(err=>{
    console.log(err);
  })
  localStorage.setItem('searched_user_email',id);
}

//set modal data
openModal(email:string,name:string,event:string,id:any,date:any){
  this.req_from=email;
  this.req_name=name;
  this.req_time=date;
  this.eventName=event;
  this.req_id=id;
  // console.log(this.req_time);
  // console.log(this.req_from);
  // console.log(this.req_name);
}


booking(){
  this.checked=false;
  this.notification_checked=true;
  this.isBookingView=true;
}

notifications(){
  this.checked=false;
  this.notification_checked=false;
  this.isBookingView=false;
}

addUserEmail(email,status){
  // alert(email)
  localStorage.setItem('searched_user_email',email);
  localStorage.setItem('isBookingReq','true');
  localStorage.setItem('status',status);
}

pay(){
  // pay();
}


//decline request
decline(id:any){
  var _this=this;
  let temArray:any=[];
  let userArrayTemp:any=[];
  let date=new Date();
  let notification_id=id+"@"+localStorage.getItem('user_name');
  let hash_id=CryptoJS.SHA256(notification_id).toString();
  let count=document.getElementById('notification_count_id').innerHTML.toString();   //get current notification count
  let _count=parseInt(count)-1;
  console.log(_count);

  //update count
  if(_count>0) document.getElementById('notification_count_id').innerHTML=_count.toString(); 
  else if(_count===0) document.getElementById('notification_count_id').setAttribute('style','display:none');

  //update view of the notification
  this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').doc(id).update({view:true,status:"Rejected"});  

  //update booking status
  this.database.firestore.collection('register_user').doc(this.req_from).collection('BookingStatus').doc(id).get().then(docs=>{
    if(!docs.exists) console.log("Empty Data");
    else{
      for(var i=0;i<docs.data().user_data.length;i++){
        if(docs.data().user_data[i].user.email===localStorage.getItem('user_name')){
          var obj={status:"Rejected",user:{email:docs.data().user_data[i].user.email,name:docs.data().user_data[i].user.name}};
          temArray.push(obj);
        }
        else{
          temArray.push(docs.data().user_data[i]);  
        }
      }
      _this.database.collection('register_user').doc(_this.req_from).collection('BookingStatus').doc(id).update({user_data:temArray});   //update booking status
    }
  });

  //remove from the booked users
  this.database.firestore.collection('register_user').doc(this.req_from).collection('MyEvents').doc(id).get().then(docs=>{
    if(!docs.exists) console.log("Empty Data");
    else{
      if(localStorage.getItem('role')==='artist'){
        for(var i=0;i<docs.data().artists;i++){
          if(localStorage.getItem('user_name')!==docs.data().artists[i].email)
          userArrayTemp.push(docs.data().artists[i]);
        }
        _this.database.firestore.collection('register_user').doc(_this.req_from).collection('MyEvents').doc(id).update({artists:userArrayTemp});   //update to the event
      }
      else if(localStorage.getItem('role')==='supplier'){
        for(var i=0;i<docs.data().suppliers;i++){
          if(localStorage.getItem('user_name')!==docs.data().suppliers[i].email)
          userArrayTemp.push(docs.data().suppliers[i]);
        }
        _this.database.firestore.collection('register_user').doc(_this.req_from).collection('MyEvents').doc(id).update({suppliers:userArrayTemp});  //update to the event
      }
      else if(localStorage.getItem('role')==='venue_owner'){
        for(var i=0;i<docs.data().venue_owners;i++){
          if(localStorage.getItem('user_name')!==docs.data().venue_owners[i].email)
          userArrayTemp.push(docs.data().venue_owners[i]);
        }
        _this.database.firestore.collection('register_user').doc(_this.req_from).collection('MyEvents').doc(id).update({venue_owners:userArrayTemp});   //update to the event
      }

      //update booking requests notification
      let booking_request={user_name:localStorage.getItem('nameId'),user_email:localStorage.getItem('user_name'),receiver_email:_this.req_from,date:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),view:false,status:"Rejected",event_id:id};
      _this.database.collection('register_user').doc(_this.req_from).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
        console.log("Updated");;
      }).catch(err=>{
        console.log(err);
      });
    }
  });

  //remove notification
  this.booking_data=this.booking_data.filter(x=>x.data.sender_email!==this.req_from);
}


//accept the request
accept(id:any){
  var _this=this;
  let date=new Date();
  console.log(this.req_from);
  let notification_id=id+"@"+localStorage.getItem('user_name');
  let hash_id=CryptoJS.SHA256(notification_id).toString();
  let count=document.getElementById('notification_count_id').innerHTML.toString();    //get current notification count
  let _count=parseInt(count)-1;
  console.log(_count);

  // update count
  if(_count>0) document.getElementById('notification_count_id').innerHTML=_count.toString();   
  else if(_count===0) document.getElementById('notification_count_id').setAttribute('style','display:none');
  let temArray:any=[];

  //update the view of the event
  this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').doc(id).update({view:true,status:"Accepted"});

  //update booking status of the organizer
  this.database.firestore.collection('register_user').doc(this.req_from).collection('BookingStatus').doc(id).get().then(docs=>{
    if(!docs.exists) console.log("Empty Data");
    else{
      for(var i=0;i<docs.data().user_data.length;i++){
        if(docs.data().user_data[i].user.email===localStorage.getItem('user_name')){
          console.log(_this.req_from+" "+docs.data().user_data[i].user.name);
          var obj={status:"Accepted",user:{email:docs.data().user_data[i].user.email,name:docs.data().user_data[i].user.name}};
          temArray.push(obj);
        }
        else{
          temArray.push(docs.data().user_data[i]);  
        }
      }
      //update booking requests notification
      let booking_request={user_name:localStorage.getItem('nameId'),user_email:localStorage.getItem('user_name'),receiver_email:_this.req_from,date:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),view:false,status:"Accepted",event_id:id};
      _this.database.collection('register_user').doc(_this.req_from).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
        console.log("Updated");;
      }).catch(err=>{
        console.log(err);
      });
      console.log(temArray);
      _this.database.collection('register_user').doc(_this.req_from).collection('BookingStatus').doc(id).update({user_data:temArray});
    }
  });

   //remove notification
   this.booking_data=this.booking_data.filter(x=>x.data.sender_email!==this.req_from);
}

// joinChat(roomId:string){
//   alert('hello');
//   disable_room_id();
//   let user_name=localStorage.getItem('nameId');
//   let date=new Date();
//   let room_id=roomId;
//   this._chatService.joinRoom({user:user_name,room:room_id,message:"Hello",date:date})
// }



}
