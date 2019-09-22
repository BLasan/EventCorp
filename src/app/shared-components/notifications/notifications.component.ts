import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notification:string="This is a new notification";
  booking_details:any;
  booking_data:any;
  sent_bookings: boolean;
  updated_data:any;
  isUpdated:boolean;
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
  }

  getRequestDetails(){
    console.log('Hello')
    let user_name=localStorage.getItem('user_name');
    this._notification.get_booking_details(user_name).subscribe(data=>{
      this.booking_details=data;
      if(this.booking_details.isEmpty==false){
        this.booking_data=this.booking_details.data;
        console.log(this.booking_data);
        
      }
    })
}

mark_view_booking_notification(receiver_email:string){
  alert(receiver_email)
  let user_name=localStorage.getItem('user_name');
  this._notification.mark_viewed_notifications(receiver_email,user_name).subscribe(data=>{
    this.updated_data=data;
    this.isUpdated=this.updated_data.updated;
    if(this.isUpdated){
      console.log('Updated successfully');
      this.getRequestDetails();
    }
    else{
      console.log('Not upldated');
    }
  })
}
}
