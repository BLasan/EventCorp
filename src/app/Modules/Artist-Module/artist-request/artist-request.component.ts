import { Component, OnInit } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate'
@Component({
  selector: 'app-artist-request',
  templateUrl: './artist-request.component.html',
  styleUrls: ['./artist-request.component.scss']
})
export class ArtistRequestComponent implements OnInit {

  data:any=[{"name":'abcd',"date":'2010-10-10',"email":'abcd@gmail.com',"contact":'0094713232112',"description":'hey'}];
  constructor() { }

  ngOnInit() {
    //deactivate_searchBar();
  }

}
