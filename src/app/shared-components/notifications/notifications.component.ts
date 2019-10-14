import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import {update_count} from 'scripts/update_notification_count';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notification:string="This is a new notification";
  notification_details:any;
  booking_data:any;
  message_details:any;
  message_data:any;
  sent_bookings: boolean;
  updated_data:any;
  isUpdated:boolean;
  isBookingView:boolean=false;
  notification_checked:boolean=false;
  checked:boolean=false;
  notification_type:string;
  notification_count:number=0;
  constructor(private _notification:NotificationService) { }
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
  }

  getRequestDetails(){
    console.log('Hello');
   // this.notification_count=0;
    let user_name=localStorage.getItem('user_name');
    this._notification.get_booking_details(user_name).subscribe(data=>{
      this.notification_details=data;
      if(this.notification_details.isEmpty==false){
        this.booking_data=this.notification_details.data;
        console.log(this.booking_data);
        this.notification_count+=this.booking_data.length;
      }
      else this.notification_count=0;

    //  localStorage.setItem('notification_count',this.notification_count.toString());
    })
}

   getMessageNotifications(){
   // this.notification_count=0;
    let user_name=localStorage.getItem('user_name');
    this._notification.get_message_notifications(user_name).subscribe(data=>{
      this.notification_details=data;
      if(this.notification_details.isEmpty==false){
        this.message_data=this.notification_details.data;
        console.log(this.message_data);
        this.notification_count+=this.message_data.length;
      }
      else this.notification_count=0;
     // localStorage.setItem('notification_count',this.notification_count.toString());
    })
   }

mark_view_booking_notification(receiver_email:string){
 // alert(receiver_email)
  let user_name=localStorage.getItem('user_name');
  this.notification_count-=1;
  if(this.isBookingView) this.notification_type="booking";
  else this.notification_type="notifications";
  update_count(this.notification_count);
  this._notification.mark_viewed_notifications(receiver_email,user_name,this.notification_type).subscribe(data=>{
    this.updated_data=data;
    this.notification_count-=1;
    this.isUpdated=this.updated_data.updated;
    if(this.isUpdated){
      console.log('Updated successfully');
      //this.navbar.update_count(this.notification_count);
      this.getRequestDetails();

    }
    else{
      console.log('Not upldated');
    }
   // localStorage.setItem('notification_count',this.notification_count.toString());
  });
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

}
