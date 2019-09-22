import { Component, OnInit } from '@angular/core';
import { RateUserService } from 'app/services/rate-user.service';
import { MatSnackBar } from '@angular/material';
import {add_comment_script,remove_comment_script} from '../../../scripts/user_comments';
import { CommentsService } from 'app/services/comments.service';
import { ActivatedRoute } from '@angular/router';
import {bind_scroll} from '../../../scripts/user_comments';
import { BookingService } from 'app/services/booking.service';
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
  success_booking:any={success:false};
  booking_details:any;
  isProcessing:boolean=false;
  sent_bookings:boolean=false;
  constructor(private rating:RateUserService,private booking:BookingService,private _snackBar:MatSnackBar,private _comment:CommentsService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.getRequestDetails();
    this.loadUserRatings();
    this.loadComments();
  }

  rateUser(){
    alert(localStorage.getItem('searched_user_email'))
    this.rating.rate_user(this.currentRate,localStorage.getItem('searched_user_email')).subscribe(data=>{
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
      this.search_token=params['name'];
      console.log(this.search_token)
      this.rating.load_ratings(localStorage.getItem('searched_user_email')).subscribe(data=>{
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

   book_now(){
    let user_name=localStorage.getItem('user_name');
    let timeStamp=new Date();
    this.isProcessing=true;
    console.log(timeStamp)
    this.booking.book_user(this.search_token,timeStamp,user_name).subscribe(data=>{
      this.success_booking=data;
      console.log(this.success_booking)
      if(this.success_booking.success==true){
        this.isProcessing=false;
        this.sent_bookings=true;
        this._snackBar.open("Successfully Sent","OK", {
          duration: 3000,
        });
      }
      else{
        this._snackBar.open("Request sending error","Book Again", {
          duration: 5000,
        });
      }
    });
   }

   getRequestDetails(){
     console.log('Hello')
    let user_name=localStorage.getItem('user_name');
     this.booking.get_booking_details(user_name,this.search_token).subscribe(data=>{
       this.booking_details=data;
       console.log(this.booking_details)
       if(this.booking_details.success){
         if(this.booking_details.data.status=="Pending")
         this.sent_bookings=true;
         else if(this.booking_details.data.status=="Rejected")
         this.sent_bookings=false;
         else if(this.booking_details.data.status=="Confirmed")
         this.sent_bookings=false;
         console.log(this.sent_bookings)
       }
       else{
         this.sent_bookings=false;
       }
     })
   }

}
