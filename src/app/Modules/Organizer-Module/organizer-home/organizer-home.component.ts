import { Component, OnInit } from '@angular/core';
import {activate_searchBar} from '../../../../scripts/search_bar_activate';
import {loadCalendar} from '../../../../scripts/artist/artist-home';
import { RateUserService } from 'app/services/rate-user.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-organizer-home',
  templateUrl: './organizer-home.component.html',
  styleUrls: ['./organizer-home.component.scss']
})
export class OrganizerHomeComponent implements OnInit {

  currentRate:any=0;
  rating_data:any;
  top_artists=[];
  top_suppliers=[];
  top_venue_owners=[];
  data:any;
  constructor(private _ratings:RateUserService) { }

  ngOnInit() {
    loadCalendar();
    activate_searchBar();
    this.get_top_users();
  }

  get_top_users(){
    this._ratings.get_top_users().subscribe((data)=>{
      //console.log(data);
      this.data=data;
      this.top_artists=this.data.filter(t=>t.role=="artist"&&t.rating>=3);
      this.top_artists=this.top_artists.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
      this.top_suppliers=this.data.filter(t=>t.role=="supplier"&&t.rating>=3);
      this.top_suppliers=this.top_suppliers.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
      this.top_venue_owners=this.data.filter(t=>t.role=="venue_owner"&&t.rating>=3);
      this.top_venue_owners=this.top_venue_owners.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
      console.log(this.top_artists+"=>ARTISTS")
      // for(let data of this.data){
        
      // }
    })
  }

  addUserEmail(email:string){
    alert(email)
    localStorage.setItem('searched_user_email',email);
  }

}
