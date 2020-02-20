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
import { disable_modal_open,disable_calendarModal,disable_report_comments} from '../../../scripts/disable_a_href';
import { timestamp, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  productItems:any=[];
  user_count:any=0;
  image_url:string="assets/img/faces/pro_img.png";
  prevRate:any=0;
  comments_array:Array<{comment:string,date:any,user_name:string,id:string}>=[];
  constructor(private _snackBar:MatSnackBar,private route:ActivatedRoute,private database:AngularFirestore) { }

  ngOnInit() {
    disable_report_comments()
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
    //calendar();
    //this.getBookingRequestSent();
    this.getRequestDetails();
    this.loadUserRatings();
    this.getSearchedUserData();
    this.loadComments();
    this.load_view_settings();
    this.load_supplier_items();
   // this.load_user_events();
    //localStorage.removeItem('status');
    // localStorage.removeItem('searched_user_email');
    //localStorage.removeItem('isBookingReq');
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
        _this.user_count=_this.user_count+1;
        _this.currentRate=Math.ceil((_this.currentRate+_this.prevRate)/_this.user_count);
         _this.database.collection('ratings').doc(_this.searched_user_email).set({rating:_this.currentRate,user_count:_this.user_count,role:user_role,image_url:doc.data().image_url,name:doc.data().user_name,email:_this.searched_user_email}).then(doc=>{
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
    //    
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


  // //load calendar
  // openCalendar(event:any){
  //   this.getData().subscribe(data=>{
  //     if(data.length>1) calendar(data);
  //     else calendar({});
  //   })
  // }


  //   //load calendar data
  //   getData():Observable<any[]>{  

  //     return this.database.collection('register_user').doc(this.searched_user_email).collection('bookings').valueChanges().pipe(
  //       tap(events=> console.log(events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
  //       map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
  //         let data:any=event;
  //         if(data.paid===true){
  //           var obj={title:data.event_name,start:new Date(data.date),constraint:data.sender_name};
  //           return obj;
  //         }
  //       }))
  //     );
  //   }

  postComment(){
   // let user_id=this.search_token;
    var _this=this;
    let timeStamp=new Date();
    if(timeStamp.getMonth()<10)
    var date=timeStamp.getFullYear()+"-"+timeStamp.getMonth()+1+"-"+timeStamp.getDate()+" "+timeStamp.getHours()+":"+timeStamp.getMinutes();
    else
    var date=timeStamp.getFullYear()+"-"+timeStamp.getMonth()+"-"+timeStamp.getDate()+" "+timeStamp.getHours()+":"+timeStamp.getMinutes();
    let comment_id=this.organizer_name+"-"+this.searched_user_email+"@"+date;
    var hash= CryptoJS.SHA256(comment_id).toString();
    let obj={comment:this.myComment,date:date,user_name:this.organizer_name,id:hash};
    this.comments_array=this.comments_array.filter(x=> x.user_name===localStorage.getItem('user_name'));
    this.comments_array.push(obj);
    console.log(this.comments_array.length);
    this.myComment="";
    this.database.collection('register_user').doc(this.searched_user_email).collection('comments').doc(hash).set({id:hash,comments:this.comments_array,sender_mail:localStorage.getItem('user_name')}).then(docs=>{
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
              _this.prevRate=doc.data().rating;
              if(doc.data().user_count)
              _this.user_count=doc.data().user_count;
              else _this.user_count=0;
           } 
           
          else{
          }
      }).catch(err => {
        console.log('Error getting documents', err);
      });

  });
}

  //loading comments
  loadComments(){
    var _this=this;
    this.comments_array=[];

    //get comments from the database
    var docRef = this.database.firestore.collection('register_user').doc(this.searched_user_email).collection('comments');
    docRef.get().then(async function(doc) {
        if (!doc.empty) {
          doc.forEach(docs=>{
            console.log(docs.id);
            var length=docs.data().comments.length;
            for(var i=0;i<length;i++){
              var comment=docs.data().comments[i].comment;
              var date=docs.data().comments[i].date;
              var user_name=docs.data().comments[i].user_name;
              var id=docs.id;
              var obj={comment:comment,date:date,user_name:user_name,id:id};
              _this.comments_array.push(obj);
            }
        });

        //bind vertical scroll
        if(_this.comments_array.length>5) bind_scroll();
      } 
      else{
        console.log('No Documents'); 
      }
    }).catch(err => {
      console.log('Error getting documents', err);
    });

   }

  //  book_now(){
  //   let _this=this;
  //   let date=new Date();
  //   let timeStamp=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+""+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  //   this.isProcessing=true;
  //   console.log(timeStamp);
  //   let sender_name=localStorage.getItem('nameId');
  //   let sender_email=localStorage.getItem('user_name');
  //   let receiver_email=this.searched_user_email;
  //   let booking_request={sender_name:sender_name,sender_email:sender_email,receiver_email:receiver_email,date:timeStamp,view:false,status:"Pending"};
  //   this.database.collection('register_user').doc(receiver_email).collection('bookings').doc(localStorage.getItem('user_name')).set(booking_request).then(()=>{
  //     _this.isProcessing=false;
  //     _this.sent_bookings=true;
  //     _this._snackBar.open("Successfully Sent","OK", {
  //       duration: 3000,
  //     });
  //   }).catch(err=>{
  //     console.log(err);
  //     _this._snackBar.open("Request sending error","Book Again", {
  //       duration: 5000,
  //     });
  //   });
  //  }


   getRequestDetails(){
   // console.log('Hello');
    var _this=this;
    console.log(this.searched_user_email);
    let user_name=localStorage.getItem('user_name');
    console.log(user_name);
    let today=new Date();
    let diff_date=new Date(today.getTime()-(1000*60*60*24*3));
    console.log(diff_date);
    var docRef = this.database.firestore.collection('register_user').doc(this.searched_user_email).collection('bookings').doc(localStorage.getItem('user_name'));
    docRef.get().then(doc=> {
      console.log("Hello");
        if(!doc.exists) _this.sent_bookings=false;
        else if(doc.data()){
          var date_created=new Date(doc.data().date);
          console.log(diff_date<=date_created);
          console
          if(diff_date<=date_created){
            _this.acceptBooking="true";
            _this.isResponded=true;
            _this.isBookingReq=true;
            console.log(doc.data());    
            if(doc.data().status=="Pending")
              _this.sent_bookings=true;
            else if(doc.data().status=="Rejected")
              _this.sent_bookings=false;
            else if(doc.data().status=="Confirmed")
              _this.sent_bookings=false;
          }
          _this.isLoaded=true;
        }
        else{
       
        } 
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });

   }

   //get searched user data
   getSearchedUserData(){
     var _this=this;
     console.log(this.searched_user_email)
     var docRef = this.database.firestore.collection('register_user').doc(this.searched_user_email);
     docRef.get().then(function(doc) {
        if(doc.data()){
          // _this.search_user_data.push(doc.data());
          _this.search_user_name=doc.data().user_name;
          _this.search_user_role=doc.data().role;
          if(_this.search_user_role==='artist') _this.load_artist_playlist();
          else if(_this.search_user_role!=='artist') _this.load_user_events();   

          //load data to an array
          _this.image_url=doc.data().image_url;
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
  }

  //view more
  load_more(){
    disable_load_more();
    this.isLoadMore=true;
  }

  //get the visibility settings
  load_view_settings(){
    var _this=this;
    this.database.firestore.collection('visibility').doc(this.searched_user_email).get().then(doc=>{
      if(!doc.data()){
        _this.events_vis=true;
        _this.about_vis=true;
        _this.contact_vis=true;
        _this.address_vis=true;
        _this.play_list_vis=true;
        _this.rating_vis=true;
        console.log("Empty Data");
      } 
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

  //loading user events
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
    this.database.firestore.collection('register_user').doc(this.searched_user_email).collection('my_playlist').doc('playlist').get().then(doc=>{
      if(!doc.exists) console.log("Empty Data");
      else{
       _this.artist_playlist.push(doc.data());
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  load_supplier_items(){
    var _this=this;
    this.database.firestore.collection('register_user').doc(this.searched_user_email).collection('our_items').get().then(doc=>{
      if(doc.empty) console.log("Empty Data");
      else{
        doc.forEach(docs=>{
          _this.productItems.push(docs.data());
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
        this.artists_participated+=artist_names.name+" / ";
      }
    }

    for(var suppliers of this.modal_details){
      for(var supplier_names of suppliers.suppliers){
        console.log(supplier_names)
        this.suppliers_participated+=supplier_names.name+" / ";
      }
    }

  }

  acceptRequest(){
    this.acceptBooking="true";
    this.isResponded=true;
    let user_email=localStorage.getItem('user_name');
    let user_name=localStorage.getItem('nameId');
    let today=new Date();
    let date=today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
    let exp_date=today.setDate(today.getDate()+3);
    let time=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    let status="Confirmed";
    let object={date:date,time:time,user_email:user_email,status:status,user_name:user_name,view:false};
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
  
    }).catch(err=>{
      console.log(err)
    })
  }



}
