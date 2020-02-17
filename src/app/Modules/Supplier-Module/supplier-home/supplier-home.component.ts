import { Component, OnInit, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {activate_searchBar} from '../../../../scripts/search_bar_activate';
import {loadCalendar} from '../../../../scripts/artist/artist-home';
import { AngularFirestore } from '@angular/fire/firestore';
import { disable_view_products } from '../../../../scripts/disable_a_href.js';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss']
})
export class SupplierHomeComponent implements OnInit,AfterViewInit{

  currentRate:any=0;
  rating_data:any;
  top_organizers=[];
  top_artists=[];
  top_venue_owners=[];
  
  data:any;
  load_items:string="loading";
  default_rate:any=0;
  isDone:boolean=false;
  product_items:any=[];
  init_items:any;
  isLoaded:boolean=false;
  isEmpty:boolean=false;
  events_array:any=[];
  filtered_events:any=[{}];
  artists:string="";
  suppliers:string="";
  venue_owners:string="";
  user_comments:any=[];
  constructor(private database:AngularFirestore,private cdr:ChangeDetectorRef,private _snackBar:MatSnackBar) { }

  ngOnInit() {
    // loadCalendar();
    activate_searchBar();
    this.getEvents();
    this.get_top_users();
    this.get_product_items();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.load_comments();
  }

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
      if(doc.data().role=="organizer" && doc.data().rating>=3){
        _this.top_organizers.push(doc.data());
         _this.top_organizers.sort().reverse();
      }
     
      // else if(doc.data().role=="artist"){
      //   _this.top_artists.push(doc.data());
      //    _this.top_artists.sort().reverse();
      // }
      
      else if(doc.data().role=="venue_owner" && doc.data().rating>=3){
        _this.top_venue_owners.push(doc.data());
         _this.top_venue_owners.sort().reverse();
      }
      _this.isDone=true;
    });

    if(_this.isDone){
     _this.top_organizers.sort().reverse();
     _this.top_artists.sort().reverse();
     _this.top_venue_owners.sort().reverse();
    }
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  }

  get_product_items(){
    var count=-0;
    var _this=this;
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').get().then(snapshot=>{
      if(snapshot.empty){
        //alert("Empty Products");
        _this.load_items="empty";
      }
      else{
        snapshot.forEach(doc=>{
          count=count+1;
          _this.load_items="loaded";
          if(count==1) _this.init_items=doc.data();
          else _this.product_items.push(doc.data());
        })
      }
    })
  }

  //add searched user email
  addUserEmail(email:string){
    alert(email)
    localStorage.setItem('searched_user_email',email);
  }


}
