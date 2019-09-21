import { Component, OnInit } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate.js'
@Component({
  selector: 'app-view-booking-info',
  templateUrl: './view-booking-info.component.html',
  styleUrls: ['./view-booking-info.component.scss']
})
export class ViewBookingInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    deactivate_searchBar();
  }

}
