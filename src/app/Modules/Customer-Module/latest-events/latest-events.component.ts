import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { disable_event_images } from '../../../../scripts/disable_a_href.js';
import { _MatChipListMixinBase } from '@angular/material';
@Component({
  selector: 'app-latest-events',
  templateUrl: './latest-events.component.html',
  styleUrls: ['./latest-events.component.scss']
})
export class LatestEventsComponent implements OnInit {

  events_array:any=[];
  filtered_events:any=[{}];
  artists:string="";
  suppliers:string="";
  venue_owners:string="";
  isLoaded:boolean=false;
  top_organizers:any=[];
  top_suppliers:any=[];
  top_venue_owners:any=[];
  isDone:boolean=false;
  isEmpty:boolean=true;
  constructor(private _db:AngularFirestore) { }

  ngOnInit() {
    document.getElementById('home_span').style.display="none";
    document.getElementById('event_span').removeAttribute('style');
    document.getElementById('contact_span').style.display="none";
    document.getElementById('about_span').style.display="none";

    document.getElementById('home_list').setAttribute('class','nav-item');
    document.getElementById('event_list').setAttribute('class','nav-item active');
    document.getElementById('contact_list').setAttribute('class','nav-item');
    document.getElementById('about_list').setAttribute('class','nav-item');

    this.get_top_users();
    disable_event_images();
    var _this=this;
    this._db.firestore.collection('register_user').get().then(snapshot=>{
      this.isLoaded=true;
      if(snapshot.empty) console.log('Empty Data');
      else{
        snapshot.forEach(docs=>{
          if(docs.data().role==='organizer'){
            console.log(docs.id)
            _this._db.firestore.collection('register_user').doc(docs.id).collection('MyEvents').get().then(snapshots=>{
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

  get_top_users(){
    var _this=this;
    var docRef=this._db.firestore.collection('ratings');
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

  }

  loadEvents(id:any){
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

}
