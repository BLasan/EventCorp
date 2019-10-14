import { Component, OnInit } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
@Component({
  selector: 'app-organizer-settings',
  templateUrl: './organizer-settings.component.html',
  styleUrls: ['./organizer-settings.component.scss']
})
export class OrganizerSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    deactivate_searchBar();
  }

}
