import { Component, OnInit } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
@Component({
  selector: 'app-organizer-notifications',
  templateUrl: './organizer-notifications.component.html',
  styleUrls: ['./organizer-notifications.component.scss']
})
export class OrganizerNotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    deactivate_searchBar()
  }

}
