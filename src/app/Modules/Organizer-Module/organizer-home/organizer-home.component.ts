import { Component, OnInit } from '@angular/core';
import {activate_searchBar} from '../../../../scripts/search_bar_activate';
import {loadCalendar} from '../../../../scripts/artist/artist-home';
import { RateUserService } from 'app/services/rate-user.service';
import {NavbarComponent} from 'app/components/navbar/navbar.component';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-organizer-home',
  templateUrl: './organizer-home.component.html',
  styleUrls: ['./organizer-home.component.scss']
})
export class OrganizerHomeComponent implements OnInit {

  currentRate:any=0;
  rating_data:any;
  top_artists:any=[];
  top_suppliers:any=[];
  top_venue_owners:any=[];
  data:any;
  isDone:boolean=false;
  constructor(private _ratings:RateUserService,private database:AngularFirestore) { }

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
      if(doc.data().role=="artist" && doc.data().rating>=3){
        _this.top_artists.push(doc.data());
         _this.top_artists.sort().reverse();
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

  addUserEmail(email:string){
    alert(email)
    localStorage.setItem('searched_user_email',email);
  }



}
