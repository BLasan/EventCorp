import { Component, OnInit } from '@angular/core';
import {calendar} from '../../../../scripts/artist/artist_calendar.js'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate'
@Component({
  selector: 'app-supplier-events',
  templateUrl: './supplier-events.component.html',
  styleUrls: ['./supplier-events.component.scss']
})
export class SupplierEventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    calendar({});
    deactivate_searchBar()
  }

}
