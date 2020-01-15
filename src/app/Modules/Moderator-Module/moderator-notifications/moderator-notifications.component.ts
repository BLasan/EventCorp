import { Component, OnInit } from '@angular/core';
import { ModeratorService } from "../../../services/moderator.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router, Params } from '@angular/router';
import { disable_report_notification } from '../../../../scripts/disable_a_href.js';
import { SendMailService } from 'app/services/sendEmail.service';
import { MatSnackBar } from '@angular/material';
// import * as sendGrid from '@sendgrid/mail';
@Component({
  selector: 'app-moderator-notifications',
  templateUrl: './moderator-notifications.component.html',
  styleUrls: ['./moderator-notifications.component.scss']
})
export class ModeratorNotificationsComponent implements OnInit {

  resultLength: number;
  reports:any=[];
  comment:string;
  date:any;
  reported_by:string;
  user_name:string;
  user_mail:string;
  success:any;
  constructor(
    private moderatorService: ModeratorService,
    private db: AngularFirestore,
    private router: Router,
    private sendMail:SendMailService,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    disable_report_notification();
    this.getData();
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

    this.db.firestore.collection('reports').get().then(docs=>{
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
    this.db.firestore.collection('reports').doc(id).get().then(doc=>{
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
          this.snackBar.open("Successfully Sent","Done", {
            duration: 2000,
          });
        }
        else{
          this.snackBar.open("Retry Sending","Done", {
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
