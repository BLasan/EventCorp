import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { AdminService } from 'app/services/admin.service';
import { MatSnackBar } from '@angular/material';
import { get_realtime_notification} from 'scripts/realtime_monitor';
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
  public data:any=[];
  update_success:any;
  constructor(private _realtime_data:AdminService,private _snackBar:MatSnackBar,private database:AngularFirestore) { }
 
  ngOnInit() {

    get_realtime_notification();
    // this._realtime_data.get_realtime().subscribe(data=>{
    //   console.log(data);
    //   this.data=data;
    //   console.log(this.data.length);
    // });


    // this.data=this._realtime_data.realtime_update();
    // console.log(this.data);
  }

  mark_view_booking_notification(user_id:string){
    this.database.collection('signup_notifications').doc(user_id).update({view:true}).then(function(){
      console.log("Done");
      
    }).catch(function(ex){
      this._snackBar.open("Deletion Unsuccessfull","Try again!", {
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

}
