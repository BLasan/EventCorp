import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit {

  ageValue: number = 0;
  searchValue: string = "";
  comments: Array<any>;
  name_filtered_items: Array<any>;
  age_filtered_items: Array<any>;
  user_comments:any=[];

  constructor(
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  //loading comments for the component
  getData(){
    this.db.collection('comments').valueChanges()
    .subscribe(result => {
      this.comments = result;
      console.log("dddddddddddddddd - ", this.comments);      
    })
  }

  //deactivating a user from the system
  deleteUser(commentedId,commentID){
    console.log("going to deactive this guy - ", commentedId);
    this.db.collection('register_user').doc(commentedId).update({profile_status:'Deleted'});
    this.deleteComment(commentedId,commentID);
  }

  //deleting a comment
  deleteComment(commentedId,commentID){
    console.log("Commented by email - ", commentedId);
    console.log("comment id - ", commentID);
    this.db.collection('register_user').doc(commentedId).collection('comments').doc(commentID).delete();
    this.db.collection('comments').doc(commentID).delete();
  }
  
}
