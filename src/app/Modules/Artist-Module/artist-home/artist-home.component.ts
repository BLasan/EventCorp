import { Component, OnInit,ChangeDetectorRef,AfterViewInit } from '@angular/core';
import {loadCalendar} from '../../../../scripts/artist/artist-home'
import {activate_searchBar} from '../../../../scripts/search_bar_activate'
import { RateUserService } from 'app/services/rate-user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { _MatChipListMixinBase } from '@angular/material';
@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.scss']
})
export class ArtistHomeComponent implements OnInit,AfterViewInit {
  currentRate:any=0;
  rating_data:any;
  top_organizers=[];
  top_suppliers=[];
  top_venue_owners=[];
  data:any;
  default_rate:any=0;
  isDone:boolean=false;
  my_playlist:any=[];
  playlist_title:string;
  user_comments:any=[];
  user_name:string;
  isLoaded:boolean=false;
  isEmpty:boolean=false;
  events_array:any=[];
  filtered_events:any=[{}];
  artists:string="";
  suppliers:string="";
  venue_owners:string="";
  constructor(private _ratings:RateUserService,private database:AngularFirestore,private _snackBar:MatSnackBar,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    // loadCalendar();
    this.user_name=localStorage.getItem('user_name')
    activate_searchBar();
    this.getEvents();
    this.get_top_users();
    this.load_comments();
    this.load_playlist();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
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
     _this.top_organizers.sort().reverse();
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
    //   this.top_organizers=this.data.filter(t=>t.role=="organizer"&&t.rating>=3);
    //   this.top_organizers=this.top_organizers.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
    //   this.top_suppliers=this.data.filter(t=>t.role=="supplier"&&t.rating>=3);
    //   this.top_suppliers=this.top_suppliers.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
    //   this.top_venue_owners=this.data.filter(t=>t.role=="venue_owner"&&t.rating>=3);
    //   this.top_venue_owners=this.top_venue_owners.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
    //   console.log(this.top_organizers+"=>ORGANIZERS")
    //   // for(let data of this.data){
        
    //   // }
    // })
  }

  addUserEmail(email:string){
    alert(email)
    localStorage.setItem('searched_user_email',email);
  }

  load_comments(){
    var _this=this;
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('comments').get().then(docs=>{
      if(!docs.empty){
        docs.forEach(doc=>{
          console.log(doc.id);
            var length=doc.data().comments.length;
            for(var i=0;i<length;i++){
              var comment=doc.data().comments[i].comment;
              var date=doc.data().comments[i].date;
              var user_name=doc.data().comments[i].user_name;
              var id=doc.id;
              var sender_mail=doc.data().sender_mail;
              var obj={comment:comment,date:date,user_name:user_name,id:id,sender_mail:sender_mail};
              _this.user_comments.push(obj);
            }
        })
      }
      else console.log("Empty Comments");
    }).catch(err=>{
      console.log(err);
    });
    console.log(this.user_comments)
  }

  load_playlist(){
    var _this=this;
    this.user_name=localStorage.getItem('user_name')
    this.database.firestore.collection('register_user').doc(this.user_name).collection('my_playlist').doc('playlist').get().then(snapshot=>{
      if(!snapshot.exists) console.log("Empty Data");
      else{
       _this.my_playlist.push(snapshot.data());
       _this.playlist_title=snapshot.data().playList_name;
      }
    })
  }

  reportComment(id:any,comment:string,user_name:string,date:string,sender_mail:string,event){
    var _this=this;
    event.preventDefault();
    this.database.collection('reports').doc(id).set({id:id,comment:comment,user_name:user_name,date:date,reported_by:localStorage.getItem('user_name'),user_email:sender_mail}).then(()=>{
      console.log("Success");
      _this._snackBar.open("Successfully Reported. Actions will be taken within few minutes","OK", {
       duration: 3000,
     });
    }).catch(err=>{
      console.log(err);
    })

  }

}