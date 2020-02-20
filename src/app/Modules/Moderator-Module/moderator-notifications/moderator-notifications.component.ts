import { Component, OnInit } from '@angular/core';
import { ModeratorService } from "../../../services/moderator.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router, Params } from '@angular/router';
import { disable_report_notification } from '../../../../scripts/disable_a_href.js';
import { SendMailService } from 'app/services/sendEmail.service';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
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
  _id:any;
  constructor(
    private moderatorService: ModeratorService,
    private db: AngularFirestore,
    private router: Router,
    private sendMail:SendMailService,
    private snackBar:MatSnackBar,
    private auth:AngularFireAuth
  ) { }

  ngOnInit() {
    this.getData();
  }

  //getting data
  getData(){
    this.db.collection('reports').valueChanges()
    .subscribe(result => {
      this.reports = result;
      console.log("ggggggggggg - ",this.reports);      
    })
  }

  //deleting a report
  deleteReport(commentId){
    console.log("deleted report id - ", commentId);
    this.db.collection('reports').doc(commentId).delete();    
  }

  //deleting a comment
  deleteComment(reportedByEmail,commentID){
    console.log("reported by email - ", reportedByEmail);
    console.log("comment id - ", commentID);
    this.db.collection('register_user').doc(reportedByEmail).collection('comments').doc(commentID).delete();
    this.db.collection('comments').doc(commentID).delete();
    this.deleteReport(commentID);
  }

  //deactivating a user
  deleteUser(commentedId,reportedByEmail,commentID){
    console.log("going to deactive this guy - ", commentedId);
    this.db.collection('register_user').doc(commentedId).update({profile_status:'Deleted'});
    this.deleteComment(reportedByEmail,commentID);
  }

}
