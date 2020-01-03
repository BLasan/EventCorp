import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { AdminService } from 'app/services/admin.service';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';

//const firebase=require('scripts/realtime_monitor');
declare var $: any;
@Component({
  selector: 'app-admin-notifications',
  templateUrl: './admin-notifications.component.html',
  styleUrls: ['./admin-notifications.component.css']
})
export class AdminNotificationsComponent implements OnInit {

  socket:any;
  details:any;
  date:any;
  public data:any=[];
  update_success:any;
  constructor(private _realtime_data:AdminService,private _snackBar:MatSnackBar,private database:AngularFirestore) { }
 
  ngOnInit() {

    this.get_realtime_notifications();
    
    // this._realtime_data.get_realtime().subscribe(data=>{
    //   console.log(data);
    //   this.data=data;
    //   console.log(this.data.length);
    // });


    // this.data=this._realtime_data.realtime_update();
    // console.log(this.data);
  }


  //mark notifications viewed
  mark_view_booking_notification(user_id:string){
    var _this=this;
    console.log(user_id);
    this.database.collection('register_user').doc(user_id).update({view_signup_notification:true}).then(function(){
      console.log("Done");
      _this.data=_this.data.filter(x=>x.email!==user_id);
      
    }).catch(function(ex){
      _this._snackBar.open("Deletion Unsuccessfull","Try again!", {
        duration: 2000,
      });
    })
    // this._realtime_data.update_view(user_id).subscribe(data=>{
    //   this.update_success=data;
    //   if(this.update_success.success){
    //     // this._realtime_data.get_realtime().subscribe(data=>{
    //     //   console.log(data);
    //     //   this.data=data;
    //     //   console.log(this.data.length);
    //     // });
    //   }
    //   else{
    //     this._snackBar.open("Deletion Unsuccessfull","Try again!", {
    //       duration: 2000,
    //     });
    //   }
    // });
  }

  //get realtime notifications
  get_realtime_notifications(){
    var _this=this;
    this.database.firestore.collection('register_user').onSnapshot(snapshot=>{
      let changes=snapshot.docChanges();
      changes.forEach(element=>{
        if(element.type=="added"){
          var date=new Date();
          _this.date=date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
          if(element.doc.data().view_signup_notification===false)
          _this.data.push(element.doc.data());
        }
        else if(element.type=="modified"){

        }
        else if(element.type=="removed"){

        }
      })
    })
  }

}
