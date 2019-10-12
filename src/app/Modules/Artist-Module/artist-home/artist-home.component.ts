import { Component, OnInit } from '@angular/core';
import {loadCalendar} from '../../../../scripts/artist/artist-home'
import {activate_searchBar} from '../../../../scripts/search_bar_activate'
import { RateUserService } from 'app/services/rate-user.service';
@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.scss']
})
export class ArtistHomeComponent implements OnInit {
  currentRate:any=0;
  rating_data:any;
  top_organizers=[];
  top_suppliers=[];
  top_venue_owners=[];
  data:any;
  default_rate:any=0;
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
      this.top_organizers=this.data.filter(t=>t.role=="organizer"&&t.rating>=3);
      this.top_organizers=this.top_organizers.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
      this.top_suppliers=this.data.filter(t=>t.role=="supplier"&&t.rating>=3);
      this.top_suppliers=this.top_suppliers.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
      this.top_venue_owners=this.data.filter(t=>t.role=="venue_owner"&&t.rating>=3);
      this.top_venue_owners=this.top_venue_owners.sort((n1,n2)=>{if(n1.rating>n2.rating)return 1;if(n1.rating<n2.rating)return -1;return 0;})
      console.log(this.top_organizers+"=>ORGANIZERS")
      // for(let data of this.data){
        
      // }
    })
  }

}
