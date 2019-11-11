import { Component, OnInit } from '@angular/core';
import {activate_searchBar} from '../../../../scripts/search_bar_activate';
import {loadCalendar} from '../../../../scripts/artist/artist-home';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss']
})
export class SupplierHomeComponent implements OnInit {

  currentRate:any=0;
  rating_data:any;
  top_organizers=[];
  top_artists=[];
  top_venue_owners=[];
  data:any;
  default_rate:any=0;
  isDone:boolean=false;
  constructor(private database:AngularFirestore) { }

  ngOnInit() {
    loadCalendar();
    activate_searchBar();
    this.get_top_users();
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
     
      else if(doc.data().role=="artist" && doc.data().rating>=3){
        _this.top_artists.push(doc.data());
         _this.top_artists.sort().reverse();
      }
      
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

}
