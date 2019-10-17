import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { AdminService } from 'app/services/admin.service';
declare var $: any;
@Component({
  selector: 'app-admin-notifications',
  templateUrl: './admin-notifications.component.html',
  styleUrls: ['./admin-notifications.component.css']
})
export class AdminNotificationsComponent implements OnInit {

  socket:any;
  details:any;
  data:any=[];
  constructor(private _realtime_data:AdminService) { }
 
  ngOnInit() {
    this._realtime_data.get_realtime().subscribe(data=>{
      console.log(data);
      this.data=data;
      console.log(this.data.length);
    })
    // this.data=this._realtime_data.realtime_update();
    // console.log(this.data);
  }

}
