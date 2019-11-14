import { Component, OnInit } from '@angular/core';
import { RateUserService } from 'app/services/rate-user.service';
import { MatSnackBar, _MatChipListMixinBase } from '@angular/material';
import {add_comment_script,remove_comment_script} from '../../../scripts/user_comments';
import { CommentsService } from 'app/services/comments.service';
import { ActivatedRoute } from '@angular/router';
import {bind_scroll} from '../../../scripts/user_comments';
import { BookingService } from 'app/services/booking.service';
import {deactivate_searchBar} from '../../../scripts/search_bar_activate';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-rating-system',
  templateUrl: './rating-system.component.html',
  styleUrls: ['./rating-system.component.scss'],
})
export class RatingSystemComponent implements OnInit {
  currentRate:any=0;
  userRate:any=0;
  success:any;
  myComment:any;
  search_token:string;
  ratings:any;
  rating_data:any;
  user_comments:any;
  comments_prev:any=[];
  current_rate:any;
  success_booking:any={success:false};
  booking_details:any;
  isProcessing:boolean=false;
  sent_bookings:boolean=false;
  search_user_data:any=[];
  searched_user_email:string;
  viewer:string;
  organizer_name:string;
  constructor(private rating:RateUserService,private booking:BookingService,private _snackBar:MatSnackBar,private _comment:CommentsService,private route:ActivatedRoute,private database:AngularFirestore) { }

  ngOnInit() {
    this.searched_user_email=localStorage.getItem('searched_user_email');
    this.viewer=localStorage.getItem('user_name');
    this.organizer_name=localStorage.getItem('nameId');
    deactivate_searchBar();
    this.getRequestDetails();
    this.loadUserRatings();
    this.loadComments();
    this.getSearchedUserData();
    //localStorage.removeItem('searched_user_email');
  }

  rateUser(){
    var _this=this;
    var docRef = this.database.firestore.collection("register_user").doc(this.searched_user_email);
    docRef.get().then(function(doc) {
    console.log(doc.data().role);
    if (doc.exists) {
        console.log("Document data:", doc.data());
        var user_role=doc.data().role;
         _this.database.collection('ratings').doc(_this.searched_user_email).set({rating:_this.currentRate,role:user_role,image_url:doc.data().image_url,name:doc.data().user_name,email:_this.searched_user_email}).then(doc=>{
         _this._snackBar.open("Successfully Rated","Done", {
            duration: 2000,
          });
        }).catch(err=>{
          console.log(err);
          _this._snackBar.open("Unsuccessfull ratings","Rate again", {
            duration: 3000,
          });
          _this.userRate=_this.currentRate;
          _this.currentRate=0;
        })
    } else {
      _this._snackBar.open("Unsuccessfull ratings","Rate again", {
        duration: 3000,
      });
      console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });

    // this.rating.rate_user(this.currentRate,this.searched_user_email).subscribe(data=>{
    //   this.success=data;
    //   if(this.success.success==true){
    //     // alert(this.currentRate)
    //     this._snackBar.open("Successfully Rated","Done", {
    //       duration: 2000,
    //     });
    //   }
    //   else{
    //     this._snackBar.open("Unsuccessfull ratings","Rate again", {
    //       duration: 3000,
    //     });
    //   }

    //   this.userRate=this.currentRate;
    //   this.currentRate=0;
    // })

  }

  remove(){
    remove_comment_script();
  }

  load(){
    add_comment_script();
  }

  postComment(){
   // let user_id=this.search_token;
    var _this=this;
    let timeStamp=new Date();
    this.database.collection('comments').doc(this.searched_user_email).set({comment:this.myComment,name:this.organizer_name,timeStamp:timeStamp}).then(docs=>{
      _this.loadComments();
      _this._snackBar.open("Successfully Posted","Done", {
        duration: 2000,
      });
    }).catch(err=>{
      console.log(err);
      _this._snackBar.open("Unsuccessfull posting","Post again", {
        duration: 3000,
      });
    })
  
    // this._comment.add_comment(this.myComment,this.searched_user_email,this.organizer_name,timeStamp).subscribe(data=>{
    //   this.success=data;
    //   console.log(this.success)
    //   if(this.success.success==true){
    //     this.loadComments();
    //     this._snackBar.open("Successfully Posted","Done", {
    //       duration: 2000,
    //     });
    //   }
    //   else{
    //     this._snackBar.open("Unsuccessfull posting","Post again", {
    //       duration: 3000,
    //     });
    //   }
    // })

  }

  loadUserRatings(){
    var _this=this;
    this.route.params.subscribe( params => {
      this.search_token=params['name'];
      console.log(this.search_token);
      var docRef = this.database.firestore.collection('ratings').doc(this.searched_user_email);
      docRef.get().then(async function(doc) {
          if (doc.data()) {
              _this.userRate=doc.data().rating;
           } 
           
          else{
          }
      }).catch(err => {
        console.log('Error getting documents', err);
      });

  //     this.rating.load_ratings(this.searched_user_email).subscribe(data=>{
  //       this.ratings=data;
  //       console.log(this.ratings.success)
  //       if(this.ratings.success==true){
  //         this.rating_data=this.ratings.data;
  //         // console.log(this.rating_data);
  //         this.userRate=this.rating_data.rating;
  //       }
  //       else console.log('Empty ratings');
        
  //     })
  // });

  });
}

   loadComments(){
    var _this=this;
    var docRef = this.database.firestore.collection('comments').doc(this.searched_user_email);
    docRef.get().then(async function(doc) {
        console.log(doc.data());
        
        if (doc.data()) {
          _this.comments_prev.push(doc.data());  
          if(_this.comments_prev.length>5) bind_scroll();
        } 
        else{
           console.log('No Documents'); 
        }
    }).catch(err => {
      console.log('Error getting documents', err);
    });

    //  this._comment.load_comment(this.searched_user_email).subscribe(data=>{
    //    this.user_comments=data;

    //    if(this.user_comments.success==true){
    //     this.comments_prev=this.user_comments.data;
    //     console.log(this.user_comments);
    //     if(this.comments_prev){
    //      var temp_array=this.comments_prev;
    //      if(temp_array.length>5){
    //        bind_scroll();
    //      }
    //     }
    //    }
    //  })

   }

   book_now(){
    let _this=this;
    let user_name=localStorage.getItem('user_name');
    let timeStamp=new Date();
    this.isProcessing=true;
    console.log(timeStamp);
    let cityRef = this.database.firestore.collection('register_user').doc(user_name);
    cityRef.get().then(doc => {
        _this.isProcessing=false;
        _this.sent_bookings=true;
        if(doc.data()){
        var docRef = _this.database.firestore.collection('register_user').doc(_this.searched_user_email);
        docRef.get().then(async function(docs) {

          var contact=doc.data().contact;
          var user_name=doc.data().user_name;
          var receiver_email=docs.data().email;
          var receiver_role=docs.data().role;
          var sender_data={receiver_email:receiver_email,receiver_id:_this.searched_user_email,receiver_name:docs.data().user_name,receiver_role:receiver_role,time:timeStamp,status:'Pending',view:false};
          var receiver_data={user_name:user_name,user_email:user_name,time:timeStamp,status:'Pending',user_contact:contact,user_role:doc.data().role,view:false};
          var sender_details=_this.database.collection('register_user').doc(user_name).collection('bookings').doc(receiver_email).set(sender_data);
          var receiver_details=_this.database.collection('register_user').doc(receiver_email).collection('bookings').doc(user_name).set(receiver_data);
          if(sender_details && receiver_details)
          _this._snackBar.open("Successfully Sent","OK", {
            duration: 3000,
          });
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
        }
        else if(!doc.data()) alert("Empty Data");

    }).catch(err => {
      console.log('Error getting document', err);
      _this._snackBar.open("Request sending error","Book Again", {
        duration: 5000,
      });
    });

    // this.booking.book_user(this.searched_user_email,timeStamp,user_name).subscribe(data=>{
    //   this.success_booking=data;
    //   console.log(this.success_booking)
    //   if(this.success_booking.success==true){
    //     this.isProcessing=false;
    //     this.sent_bookings=true;
    //     this._snackBar.open("Successfully Sent","OK", {
    //       duration: 3000,
    //     });
    //   }
    //   else{
    //     this._snackBar.open("Request sending error","Book Again", {
    //       duration: 5000,
    //     });
    //   }
    // });

   }

   getRequestDetails(){
    console.log('Hello');
    var _this=this;
    console.log(this.searched_user_email);
    let user_name=localStorage.getItem('user_name');
    var docRef = this.database.firestore.collection('register_user').doc(user_name).collection('bookings').doc(this.searched_user_email);
    docRef.get().then(async function(doc) {
        if(doc.data()){
          console.log(doc.data());    
          if(doc.data().status=="Pending")
            _this.sent_bookings=true;
          else if(doc.data().status=="Rejected")
            _this.sent_bookings=false;
          else if(doc.data().status=="Confirmed")
            _this.sent_bookings=false;
        }
        else{
         // alert("Empty Data");
        } 
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });

    //  this.booking.get_booking_details(user_name,this.searched_user_email).subscribe(data=>{
    //    this.booking_details=data;
    //    console.log(this.booking_details+"=>DATA")
    //    if(this.booking_details.success){
    //      if(this.booking_details.data.status=="Pending")
    //      this.sent_bookings=true;
    //      else if(this.booking_details.data.status=="Rejected")
    //      this.sent_bookings=false;
    //      else if(this.booking_details.data.status=="Confirmed")
    //      this.sent_bookings=false;
    //      console.log(this.sent_bookings)
    //    }
    //    else{
    //      this.sent_bookings=false;
    //    }
    //  })

   }

   getSearchedUserData(){
     console.log("hrll");
     var _this=this;
     var docRef = this.database.firestore.collection('register_user').doc(this.searched_user_email);
     docRef.get().then(function(doc) {
        console.log("UseData:"+doc.data().role)
        if(doc.data()){
          _this.search_user_data.push(doc.data());
        }

        else{
           alert("Empty Data");
        }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    // this.rating.loadSearchedUserData(this.searched_user_email).subscribe(data=>{
    //   console.log("GEtting")
    //   this.search_user_data=data;
    //  console.log(this.search_user_data.status);
    // })
  }

}
