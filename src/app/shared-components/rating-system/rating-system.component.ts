import { Component, OnInit } from '@angular/core';
import { RateUserService } from 'app/services/rate-user.service';
import { MatSnackBar } from '@angular/material';
import {add_comment_script,remove_comment_script} from '../../../scripts/user_comments';
import { CommentsService } from 'app/services/comments.service';
import { ActivatedRoute } from '@angular/router';
import {bind_scroll} from '../../../scripts/user_comments';
@Component({
  selector: 'app-rating-system',
  templateUrl: './rating-system.component.html',
  styleUrls: ['./rating-system.component.scss'],
})
export class RatingSystemComponent implements OnInit {
  currentRate:any=0;
  success:any;
  myComment:any;
  search_token:string;
  ratings:any;
  rating_data:any;
  user_comments:any;
  comments_prev:any;
  current_rate:any;
  constructor(private rating:RateUserService,private _snackBar:MatSnackBar,private _comment:CommentsService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.loadUserRatings();
    this.loadComments();
  }

  rateUser(){
    this.rating.rate_user(this.currentRate,this.search_token).subscribe(data=>{
      this.success=data;
      if(this.success.success==true){
        this._snackBar.open("Successfully Rated","Done", {
          duration: 2000,
        });
      }
      else{
        this._snackBar.open("Unsuccessfull ratings","Rate again", {
          duration: 3000,
        });
      }
    })
  }

  remove(){
    remove_comment_script();
  }

  load(){
    add_comment_script();
  }

  postComment(){
    let user_id=this.search_token;
    let user_name=localStorage.getItem('nameId');
    let timeStamp=new Date();
    this._comment.add_comment(this.myComment,user_id,user_name,timeStamp).subscribe(data=>{
      this.success=data;
      console.log(this.success)
      if(this.success.success==true){
        this.loadComments();
        this._snackBar.open("Successfully Posted","Done", {
          duration: 2000,
        });
      }
      else{
        this._snackBar.open("Unsuccessfull posting","Post again", {
          duration: 3000,
        });
      }
    })
  }

  loadUserRatings(){
    this.route.params.subscribe( params => {
      this.search_token=params['token'];
      console.log(this.search_token)
      this.rating.load_ratings(this.search_token).subscribe(data=>{
        this.ratings=data;
        console.log(this.ratings.success)
        if(this.ratings.success==true){
          this.rating_data=this.ratings.data;
          // console.log(this.rating_data);
          this.currentRate=this.rating_data.rating;
        }
        else console.log('Empty ratings');
      })
  });
  }

   loadComments(){
     this._comment.load_comment(this.search_token).subscribe(data=>{
       this.user_comments=data;

       if(this.user_comments.success==true){
        this.comments_prev=this.user_comments.data;
        console.log(this.user_comments);
        if(this.comments_prev){
         var temp_array=this.comments_prev;
         if(temp_array.length>5){
           bind_scroll();
         }
        }
       }
     })
   }

}
