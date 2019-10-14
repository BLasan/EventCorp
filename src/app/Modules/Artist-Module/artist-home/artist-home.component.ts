import { Component, OnInit } from '@angular/core';
import {loadCalendar} from '../../../../scripts/artist/artist-home'
import {activate_searchBar} from '../../../../scripts/search_bar_activate'
@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.scss']
})
export class ArtistHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    loadCalendar();
    activate_searchBar();
  }

}
