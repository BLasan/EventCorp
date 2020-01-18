import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { AdminService } from 'app/services/admin.service';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { SendMailService } from 'app/services/sendEmail.service';

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
  resultLength: number;
  reports:any=[];
  comment:string;
  reported_by:string;
  user_name:string;
  user_mail:string;
  success:any;
  constructor(
    private _realtime_data:AdminService,
    private _snackBar:MatSnackBar,
    private database:AngularFirestore,
    private sendMail:SendMailService,
    ) { }
 
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

   //get reports
   getData(){
    var _this=this;
    // this.moderatorService.getReports()
    // .subscribe(result => {
    //   this.items = result;
    //   this.resultLength = result.length;
    //   console.log("\nresultLengeth - "+this.resultLength);
    // })

    this.database.firestore.collection('reports').get().then(docs=>{
      if(docs.empty) console.log("Empty Data");
      else{
        docs.forEach(doc=>{
          _this.reports.push(doc.data());
        })
      }
    })

  }


  //filter the user comments when selected
  filterComment(id:any){
    var _this=this;
    this.database.firestore.collection('reports').doc(id).get().then(doc=>{
      if(!doc.exists) console.log("Empty");
      else{
        _this.comment=doc.data().comment;
        _this.date=doc.data().date;
        _this.user_name=doc.data().user_name;
        _this.user_mail=doc.data().user_email;
        _this.reported_by=doc.data().reported_by;
      } 
    });
  console.log(this.user_mail);
  }


  //send warning message
  sendWarning(){
    try{
      console.log(this.user_mail);
      var today=new Date();
      let date=today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
      let sentBy="moderator@eventCorp.com";
      let message="This is a warning message to inform that you have been reported by the system due to inappropriate behaviour.";
     // sendGrid.setApiKey('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');
      const email_message={
        to: this.user_mail,
        from: sentBy,
        subject: "Inappropriate Behaviour Reported",
        text: message,
        html: '<strong>'+message+'</strong>',
      }
      this.sendMail.sendEmail(email_message).subscribe((data)=>{
        this.success=data;
        if(this.success.success===true){
          this._snackBar.open("Successfully Sent","Done", {
            duration: 2000,
          });
        }
        else{
          this._snackBar.open("Retry Sending","Done", {
            duration: 2000,
          }); 
        }
      })
     // sendGrid.send(email_message);
    }catch(err){
      console.log(err);
    }

    //api- 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
  }

}
