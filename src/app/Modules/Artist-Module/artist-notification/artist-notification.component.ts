import { Component, OnInit } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate'
@Component({
  selector: 'app-artist-notification',
  templateUrl: './artist-notification.component.html',
  styleUrls: ['./artist-notification.component.scss']
})
export class ArtistNotificationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    deactivate_searchBar();
  }

}
