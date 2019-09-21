import { Component, OnInit } from '@angular/core';
import {activate_searchBar} from '../../../../scripts/search_bar_activate';
import {loadCalendar} from '../../../../scripts/artist/artist-home';
@Component({
  selector: 'app-organizer-home',
  templateUrl: './organizer-home.component.html',
  styleUrls: ['./organizer-home.component.scss']
})
export class OrganizerHomeComponent implements OnInit {

  currentRate:any=2;
  constructor() { }

  ngOnInit() {
    loadCalendar();
    activate_searchBar();
  }

}
