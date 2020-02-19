import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material";
// import { VenueHomeService } from "../venue-home.service";
import { MatButtonModule } from "@angular/material/button";
import { AngularFirestore } from "@angular/fire/firestore";
import { LoginService } from "app/services/login.services";
import { Router, Params } from '@angular/router';
import * as firebase from "firebase";

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit {

  // comments;

  ageValue: number = 0;
  searchValue: string = "";
  comments: Array<any>;
  name_filtered_items: Array<any>;
  age_filtered_items: Array<any>;
  user_comments:any=[];

  constructor(
    // private venueHomeService: VenueHomeService,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.db.collection('comments').valueChanges()
    .subscribe(result => {
      this.comments = result;
      console.log("dddddddddddddddd - ", this.comments);
      // this.age_filtered_items = result;
      // this.name_filtered_items = result;
    })
  }

  deleteUser(commentedId,commentID){
    console.log("going to deactive this guy - ", commentedId);
    this.db.collection('register_user').doc(commentedId).update({profile_status:'Deleted'});
    this.deleteComment(commentedId,commentID);
  }

  deleteComment(commentedId,commentID){
    console.log("Commented by email - ", commentedId);
    console.log("comment id - ", commentID);
    this.db.collection('register_user').doc(commentedId).collection('comments').doc(commentID).delete();
    this.db.collection('comments').doc(commentID).delete();
    // this.deleteReport(commentID);
  }
  
  

  // getData(){
  //   // var _this=this;
  //   this.db.firestore.collection('comments').get().then(docs=>{
  //     if(!docs.empty){
  //       docs.forEach(doc=>{
  //         console.log(doc.id);
  //           var length=doc.data().comments.length;
  //           for(var i=0;i<length;i++){
  //             var comment=doc.data().comments[i].comment;
  //             var date=doc.data().comments[i].date;
  //             var user_name=doc.data().comments[i].user_name;
  //             var id=doc.id;
  //             var sender_mail=doc.data().sender_mail;
  //             var obj={comment:comment,date:date,user_name:user_name,id:id,sender_mail:sender_mail};
  //             this.user_comments.push(obj);
  //           }
  //       })
  //     }
  //     else console.log("Empty Comments");
  //   }).catch(err=>{
  //     console.log(err);
  //   });
  //   console.log(this.user_comments)
  // }

}
