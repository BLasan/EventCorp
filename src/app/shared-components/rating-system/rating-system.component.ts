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
import { disable_load_more} from '../../../scripts/disable_a_href';
import CryptoJS from 'crypto-js';
import {calendar} from '../../../scripts/artist/artist_calendar.js'
import { disable_modal_open,disable_calendarModal} from '../../../scripts/disable_a_href';
@Component({
  selector: 'app-rating-system',
  templateUrl: './rating-system.component.html',
  styleUrls: ['./rating-system.component.scss'],
})
export class RatingSystemComponent implements OnInit {
  events_vis:boolean=true;
  rating_vis:boolean=true;
  about_vis:boolean=true;
  contact_vis:boolean=true;
  address_vis:boolean=true;
  play_list_vis:boolean=true;
  isLoaded:boolean=false;
  my_events:String="";
  my_events_array:any=[];
  artist_playlist:any=[];
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
  modal_details:any;
  artists_participated:string="";
  suppliers_participated:string="";
  success_booking:any={success:false};
  booking_details:any;
  isProcessing:boolean=false;
  sent_bookings:boolean=false;
  search_user_data:any=[];
  search_user_name:any;
  search_user_role:any;
  search_user_about:String;
  search_user_contact:String;
  search_user_address:String;
  searched_user_email:string;
  isBookingReq:boolean=false;
  requestStatus:string;
  viewer:string;
  user_role:string;
  organizer_name:string;
  acceptBooking:string=null;
  isResponded:boolean=false;
  isLoadMore:boolean=false;
  image_url:string="assets/img/faces/pro_img.png";
  comments_array:Array<{comment:String,date:any,user_name:String}>=[];
  constructor(private rating:RateUserService,private booking:BookingService,private _snackBar:MatSnackBar,private _comment:CommentsService,private route:ActivatedRoute,private database:AngularFirestore) { }

  ngOnInit() {
    this.searched_user_email=localStorage.getItem('searched_user_email');
    console.log(this.searched_user_email)
    this.viewer=localStorage.getItem('user_name');
    this.organizer_name=localStorage.getItem('nameId');
    this.user_role=localStorage.getItem('role');

    if(localStorage.getItem('status'))
    this.requestStatus=localStorage.getItem('status');
    else
    this.requestStatus=null;

    if(!localStorage.getItem('isBookingReq')) this.isBookingReq=false;
    else this.isBookingReq=true;

    deactivate_searchBar();
    disable_calendarModal();
    calendar();
    //this.getBookingRequestSent();
    this.getRequestDetails();
    this.loadUserRatings();
    this.getSearchedUserData();
    this.loadComments();
    this.load_view_settings();
    this.load_user_events();
    localStorage.removeItem('status');
    localStorage.removeItem('searched_user_email');
    localStorage.removeItem('isBookingReq');
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
       // alert(_this.searched_user_email)
         _this.database.collection('ratings').doc(_this.searched_user_email).set({rating:_this.currentRate,role:user_role,image_url:doc.data().img_url,name:doc.data().user_name,email:_this.searched_user_email}).then(doc=>{
         _this._snackBar.open("Successfully Rated","Done", {
            duration: 2000,
          });
        }).catch(err=>{
          console.log(err);
          _this._snackBar.open("Unsuccessfull ratings","Rate again", {
            duration: 3000,
          });
        });
        _this.userRate=_this.currentRate;
        _this.currentRate=0;
    } 
    else {
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
    // alert("Hello")
    add_comment_script();
  }

  postComment(){
   // let user_id=this.search_token;
    var _this=this;
    let timeStamp=new Date();
    let date=timeStamp.getFullYear()+"-"+timeStamp.getMonth()+"-"+timeStamp.getDate()+" "+timeStamp.getHours()+":"+timeStamp.getMinutes();
    let obj={comment:this.myComment,date:date,user_name:this.organizer_name};
    let comment_id=this.organizer_name+"-"+this.searched_user_email+"@"+date;
    var hash= CryptoJS.SHA256(comment_id).toString();
    this.comments_array.push(obj);
    console.log(this.comments_array.length);
    this.myComment="";
    this.database.collection('register_user').doc(this.searched_user_email).collection('comments').doc(hash).set({comments:this.comments_array}).then(docs=>{
     // _this.loadComments();
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
    this.comments_array=[];
    var docRef = this.database.firestore.collection('register_user').doc(this.searched_user_email).collection('comments');
    docRef.get().then(async function(doc) {
        if (!doc.empty) {
          doc.forEach(docs=>{
            console.log(docs.id);
            var length=docs.data().comments.length;
            for(var i=0;i<length;i++)
            _this.comments_array.push(docs.data().comments[i]);
          })
          // _this.comments_array=doc.data().comments;
          // console.log(_this.comments_array.length);
          if(_this.comments_array.length>5) bind_scroll();
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
    let date=new Date();
    let timeStamp=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+""+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    this.isProcessing=true;
    console.log(timeStamp);
    let sender_name=localStorage.getItem('nameId');
    let sender_email=localStorage.getItem('user_name');
    let receiver_email=this.searched_user_email;
    let booking_request={sender_name:sender_name,sender_email:sender_email,receiver_email:receiver_email,date:timeStamp,view:false,status:"Pending"};
    this.database.collection('register_user').doc(receiver_email).collection('bookings').doc(localStorage.getItem('user_name')).set(booking_request).then(()=>{
      _this.isProcessing=false;
      _this.sent_bookings=true;
      _this._snackBar.open("Successfully Sent","OK", {
        duration: 3000,
      });
    }).catch(err=>{
      console.log(err);
      _this._snackBar.open("Request sending error","Book Again", {
        duration: 5000,
      });
    });

    // let cityRef = this.database.firestore.collection('register_user').doc(user_name);
    // cityRef.get().then(doc => {
    //     _this.isProcessing=false;
    //     _this.sent_bookings=true;
    //     if(doc.data()){
    //     var docRef = _this.database.firestore.collection('register_user').doc(_this.searched_user_email);
    //     docRef.get().then(async function(docs) {

    //       var contact=doc.data().contact;
    //       var user_name=doc.data().user_name;
    //       var receiver_email=docs.data().email;
    //       var receiver_role=docs.data().role;
    //       var sender_data={receiver_email:receiver_email,receiver_id:_this.searched_user_email,receiver_name:docs.data().user_name,receiver_role:receiver_role,time:timeStamp,status:'Pending',view:false};
    //       var receiver_data={user_name:user_name,user_email:user_name,time:timeStamp,status:'Pending',user_contact:contact,user_role:doc.data().role,view:false};
    //       var sender_details=_this.database.collection('register_user').doc(user_name).collection('bookings').doc(receiver_email).set(sender_data);
    //       var receiver_details=_this.database.collection('register_user').doc(receiver_email).collection('bookings').doc(user_name).set(receiver_data);
    //       if(sender_details && receiver_details)
    //       _this._snackBar.open("Successfully Sent","OK", {
    //         duration: 3000,
    //       });
    //     }).catch(function(error) {
    //       console.log("Error getting document:", error);
    //     });
    //     }
    //     else if(!doc.data()) alert("Empty Data");

    // }).catch(err => {
    //   console.log('Error getting document', err);
    //   _this._snackBar.open("Request sending error","Book Again", {
    //     duration: 5000,
    //   });
    // });

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
    console.log(this.searched_user_email);
    var docRef = this.database.firestore.collection('register_user').doc(this.searched_user_email).collection('bookings').doc(localStorage.getItem('user_name'));
    docRef.get().then(async function(doc) {
      console.log("Hello")
        if(!doc.exists) _this.sent_bookings=false;
        else if(doc.data()){
          _this.acceptBooking="true";
          _this.isResponded=true
          console.log(doc.data());    
          if(doc.data().status=="Pending")
            _this.sent_bookings=true;
          else if(doc.data().status=="Rejected")
            _this.sent_bookings=false;
          else if(doc.data().status=="Confirmed")
            _this.sent_bookings=false;
          _this.isLoaded=true;
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
    
     var _this=this;
     var docRef = this.database.firestore.collection('register_user').doc(this.searched_user_email);
     docRef.get().then(function(doc) {
      //  alert("UseData:"+doc.data().role)
        if(doc.data()){
          // _this.search_user_data.push(doc.data());
          _this.search_user_name=doc.data().user_name;
          _this.search_user_role=doc.data().role;
          if(_this.search_user_role==='artist'){
            _this.database.firestore.collection('register_user').doc(_this.searched_user_email).collection('my_playlist').doc('playlist').get().then(docs=>{
              if(!docs.exists) console.log("Empty Data")
              else{
               _this.artist_playlist.push(docs.data().playlist)
               console.log(_this.artist_playlist)
              }
            })
          }
          _this.image_url=doc.data().img_url;
          _this.search_user_about=doc.data().bio;
          if(!_this.search_user_about) _this.search_user_about="Not Updated";
          _this.search_user_contact=doc.data().contact;
          _this.searched_user_email=doc.data().email;
          _this.search_user_address=doc.data().address1+" "+doc.data().address2;
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

  load_more(){
    disable_load_more();
    this.isLoadMore=true;
  }

  load_view_settings(){
    var _this=this;
    this.database.firestore.collection('visibility').doc(this.searched_user_email).get().then(doc=>{
      if(!doc.data()) console.log("Empty Data");
      else{
        if(doc.data().events===false) _this.events_vis=false;
        if(doc.data().about===false) _this.about_vis=false;
        if(doc.data().contact===false) _this.contact_vis=false;
        if(doc.data().address===false) _this.address_vis=false;
        if(doc.data().playlist===false && _this.search_user_role==='artist') _this.play_list_vis=false;
        if(doc.data().rating===false && _this.search_user_role!='artist') _this.rating_vis=false;
      }
    });
  }

  load_user_events(){
    var _this=this;
    this.database.firestore.collection('register_user').doc(this.searched_user_email).collection('MyEvents').get().then(snapshot=>{
      if(snapshot.empty) console.log("Empty Events");
      else{
        snapshot.forEach(doc=>{
          _this.my_events+=doc.data().event_name+" /";
          _this.my_events_array.push(doc.data());
        })
      }
    })
  }

  load_artist_playlist(){
    var _this=this;
    this.database.firestore.collection('register_user').doc(this.searched_user_email).collection('my_playlist').get().then(doc=>{
      if(doc.empty) console.log("Empty Data");
      else{
        doc.forEach(docs=>{
          _this.artist_playlist.push(docs.data());
        })
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  
  load_modal(event_id:any){
    disable_modal_open();
    console.log(event_id);
    this.modal_details=this.my_events_array.filter(x=>x.event_id===event_id);
    console.log(this.modal_details)
    for(var artists of this.modal_details){
      for(var artist_names of artists.artists){
        console.log(artist_names)
        this.artists_participated+=" / "+artist_names;
      }
    }

    for(var suppliers of this.modal_details){
      for(var supplier_names of suppliers.suppliers){
        console.log(supplier_names)
        this.suppliers_participated+=" / "+supplier_names;
      }
    }

  }

  acceptRequest(){
    this.acceptBooking="true";
    this.isResponded=true;
    let user_email=localStorage.getItem('user_name');
    let user_name=localStorage.getItem('nameId');
    let today=new Date();
    let date=today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    let status="Confirmed";
    let object={date:date,user_email:user_email,status:status,user_name:user_name,view:false};
    this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').doc(this.searched_user_email).update({status:'Confirmed'});
    this.database.collection('register_user').doc(this.searched_user_email).collection('bookings').doc(localStorage.getItem('user_name')).set(object).then(()=>{
      // localStorage.removeItem('searched_user_email');
      // localStorage.removeItem('isBookingReq');
    }).catch(err=>{
      console.log(err);
    })
  }

  // getBookingRequestSent(){
  //   var _this=this;
  //   this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').doc(this.searched_user_email).get().then((doc)=>{
  //     if(!doc.exists) _this.sent_bookings=false;
  //     else if(doc.data().view===false) _this.sent_bookings=true;
  //     else _this.sent_bookings=false;
  //   })
  // }

  declineRequest(){
    this.acceptBooking="false";
    this.isResponded=true;
    let user_email=localStorage.getItem('user_name');
    let today=new Date();
    let date=today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    let status="Rejected";
    let user_name=localStorage.getItem('nameId');
    let object={date:date,user_email:user_email,status:status,user_name:user_name,view:false};
    this.database.collection('register_user').doc(this.searched_user_email).update({status:'Rejected'});
    this.database.collection('register_user').doc(this.searched_user_email).collection('bookings').doc(localStorage.getItem('user_name')).set(object).then(()=>{
      // localStorage.removeItem('searched_user_email');
      // localStorage.removeItem('isBookingReq');
    }).catch(err=>{
      console.log(err)
    })
  }



}
