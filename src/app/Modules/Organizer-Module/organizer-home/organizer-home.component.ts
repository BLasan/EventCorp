import { Component, OnInit,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import {activate_searchBar} from '../../../../scripts/search_bar_activate';
import {loadCalendar} from '../../../../scripts/artist/artist-home';
import { RateUserService } from 'app/services/rate-user.service';
import {NavbarComponent} from 'app/components/navbar/navbar.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { disable_modal_open,disable_report_comments} from '../../.././../scripts/disable_a_href.js';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-organizer-home',
  templateUrl: './organizer-home.component.html',
  styleUrls: ['./organizer-home.component.scss']
})
export class OrganizerHomeComponent implements OnInit,AfterViewInit {

  currentRate:any=0;
  rating_data:any;
  top_artists:any=[];
  top_suppliers:any=[];
  top_venue_owners:any=[];
  data:any;
  user_comments:any=[];
  events:any=[];
  isDone:boolean=false;
  modal_details:any;
  artists_participated:string="";
  suppliers_participated:string="";
  venue:string="";
  id:any;
  isLoaded:boolean=false;
  isEmpty:boolean=false;
  events_array:any=[];
  filtered_events:any=[{}];
  artists:string="";
  suppliers:string="";
  venue_owners:string="";
  constructor(private _ratings:RateUserService,private database:AngularFirestore,private _snackBar:MatSnackBar,private storage:AngularFireStorage,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    // loadCalendar();
    activate_searchBar();
    disable_report_comments();
    this.get_top_users();
    this.load_events();
    this.load_comments();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.getEvents();
  }

    //get latest events
    getEvents(){
      var _this=this;
      this.database.firestore.collection('register_user').get().then(snapshot=>{
        this.isLoaded=true;
        if(snapshot.empty) console.log('Empty Data');
        else{
          snapshot.forEach(docs=>{
            if(docs.data().role==='organizer'){
              console.log(docs.id)
              _this.database.firestore.collection('register_user').doc(docs.id).collection('MyEvents').get().then(snapshots=>{
                if(snapshots.empty) {
                  console.log("Empty Events");
                  _this.isEmpty=true;
                  _this.isLoaded=true;
                }
                else{
                  _this.isEmpty=false;
                  snapshots.forEach(events=>{
                    let date=events.data().date;
                    console.log(new Date(date))
                    if(new Date()<=new Date(date))
                    _this.events_array.push(events.data());
                    else console.log("Not valid")
                  })
                  _this.isLoaded=true;
                }
              })
            }
          })
        }
      });
    }

  //get top users
  get_top_users(){
    var _this=this;
    var docRef=this.database.firestore.collection('ratings');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if(doc.data().role=="artist"){
        // _this.top_artists.push(doc.data());
        //  _this.top_artists.sort().reverse();
      }
     
      else if(doc.data().role=="supplier" && doc.data().rating>=3){
        _this.top_suppliers.push(doc.data());
         _this.top_suppliers.sort().reverse();
      }
      
      else if(doc.data().role=="venue_owner" && doc.data().rating>=3){
        _this.top_venue_owners.push(doc.data());
        // _this.top_venue_owners.sort().reverse();
      }
      _this.isDone=true;
    });

    if(_this.isDone){
     _this.top_artists.sort().reverse();
     _this.top_suppliers.sort().reverse();
     _this.top_venue_owners.sort().reverse();
    }
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });

    // this._ratings.get_top_users().subscribe((data)=>{
    //   //console.log(data);
    //   this.data=data;
    //   this.top_artists=this.data.filter(t=>t.role=="artist"&&t.rating>=3);
    //   this.top_artists=this.top_artists.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
    //   this.top_suppliers=this.data.filter(t=>t.role=="supplier"&&t.rating>=3);
    //   this.top_suppliers=this.top_suppliers.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
    //   this.top_venue_owners=this.data.filter(t=>t.role=="venue_owner"&&t.rating>=3);
    //   this.top_venue_owners=this.top_venue_owners.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
    //   console.log(this.top_artists+"=>ARTISTS")
    //   // for(let data of this.data){
        
    //   // }
    // })

  }


  //add searched user email
  addUserEmail(email:string){
    alert(email)
    localStorage.setItem('searched_user_email',email);
  }


  //report comments
  reportComment(id:any,comment:string,user_name:string,date:string,sender_mail:string){
    var _this=this;
    this.database.collection('reports').doc(id).set({id:id,comment:comment,user_name:user_name,date:date,reported_by:localStorage.getItem('user_name'),user_email:sender_mail,view:false}).then(()=>{
      console.log("Success");
      _this._snackBar.open("Successfully Reported. Actions will be taken within few minutes","OK", {
       duration: 3000,
     });
    }).catch(err=>{
      console.log(err);
    })

  }

  // load_comments(){
  //   var _this=this;
  //   this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('comments').get().then(docs=>{
  //     if(!docs.empty){
  //       docs.forEach(doc=>{
  //         _this.user_comments.push(doc.data().comments);
  //       })
  //     }
  //     else console.log("Empty Comments");
  //   }).catch(err=>{
  //     console.log(err);
  //   });
  //   console.log(this.user_comments)
  // }


  //load comments
  load_comments(){
    var _this=this;
    var docRef = this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('comments');
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
              var sender_email=docs.data().sender_mail;
              var obj={comment:comment,date:date,user_name:user_name,id:id,sender_mail:sender_email};
              _this.user_comments.push(obj);
            }
           
          })
        } 
        else{
           console.log('No Documents'); 
        }
    }).catch(err => {
      console.log('Error getting documents', err);
    });
   }

  //load event details
  loadEvents(id:any,event){
    event.preventDefault();
    this.artists="";
    this.suppliers="";
    this.venue_owners="";
    this.filtered_events=[];
    this.filtered_events=this.events_array.filter(x=> x.event_id==id);

    for(var i=0;i<this.filtered_events[0].artists.length;i++){
      this.artists+=this.filtered_events[0].artists[i].name+" / ";
    }

    for(var i=0;i<this.filtered_events[0].suppliers.length;i++){
      this.suppliers+=this.filtered_events[0].suppliers[i].name+" / ";
    }

    for(var i=0;i<this.filtered_events[0].venue_owners.length;i++){
      this.venue_owners+=this.filtered_events[0].venue_owners[i].name+" / ";
    }    
}


  //load modal data
  load_modal(event_id:any){
    disable_modal_open();
    console.log(event_id);
    // this.modal_details=[];
    this.id=event_id;
    this.artists="";
    this.suppliers="";
    this.venue_owners="";
    this.filtered_events=[];
    this.filtered_events=this.events_array.filter(x=> x.event_id==event_id);

    for(var i=0;i<this.filtered_events[0].artists.length;i++){
      this.artists+=this.filtered_events[0].artists[i].name+" / ";
    }

    for(var i=0;i<this.filtered_events[0].suppliers.length;i++){
      this.suppliers+=this.filtered_events[0].suppliers[i].name+" / ";
    }

    for(var i=0;i<this.filtered_events[0].venue_owners.length;i++){
      this.venue_owners+=this.filtered_events[0].venue_owners[i].name+" / ";
    }  

    // this.modal_details=this.events_array.filter(x=>x.event_id===event_id);
    // console.log(this.modal_details)
    // for(var artists of this.modal_details){
    //   for(var artist_names of artists.artists){
    //     console.log(artist_names.name)
    //     this.artists_participated+=artist_names.name+" / ";
    //   }
    // }

    // for(var suppliers of this.modal_details){
    //   for(var supplier_names of suppliers.suppliers){
    //     console.log(supplier_names.name)
    //     this.suppliers_participated+=supplier_names.name+" / ";
    //   }
    // }

    // for(var venue of this.modal_details){
    //   for(var venue_names of venue.venue_owners){
    //     console.log(venue_names.name)
    //     this.venue+=venue_names.name+" / ";
    //   }
    // }

  }


  //load organizer events
  load_events(){
    var _this=this;
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').get().then(snapshot=>{
      if(snapshot.empty) console.log("Empty Data");
      else{
        snapshot.forEach(docs=>{
          _this.events.push(docs.data());
        })
      }
    });
    console.log(this.events);
  }

  //delete event
  deleteEvent(id:any){
    var _this=this;
    let close_modal=document.getElementById('close_modal');
    this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(id).delete().then(()=>{
      console.log("Successfully Deleted");

      //delete the requests
      _this.database.firestore.collection('register_user').get().then(doc=>{
        if(!doc.empty){
          doc.forEach(docs=>{
            console.log(docs.id);

            if(docs.data().role!=='organizer'){
              _this.database.collection('register_user').doc(docs.id).collection('bookings').doc(id).delete().then(()=>{
              console.log("Successfully Deleted");
              let image_id="Events/"+localStorage.getItem('user_name')+"/"+id+"/"+"coverPic";
              let videoId="Events/"+localStorage.getItem('user_name')+"/"+id+"/"+"coverVideo";
              _this.storage.ref(image_id).delete();
              _this.storage.ref(videoId).delete();
              close_modal.click();
            }).catch(err=>{
              console.log(err);
            })
            }
          })
        }
      }).catch(err=>{
        console.log(err);
      });


      //delete bookings of organizer
      _this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').get().then(doc=>{
        if(!doc.empty){
          doc.forEach(docs=>{
            if(docs.data().event_id===id){
              console.log(docs.id)
              _this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').doc(docs.id).delete().then(()=>{
                console.log("Successfully Deleted");
              }).catch(err=>{
                console.log(err);
              })
            }
          })
        }
      })

      //delete booking status
      _this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(id).delete().then(()=>{
        console.log("Successfully Deleted");
      }).catch(err=>{
        console.log(err);
      });

      _this.events=_this.events.filter(x=>x.event_id!==id);     //filter undeleted events

    }).catch(err=>{
      console.log(err);
    })
  }
}
