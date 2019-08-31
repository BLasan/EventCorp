import { Component, OnInit } from '@angular/core';
declare function initializeRatings();
@Component({
  selector: 'app-rating-system',
  templateUrl: './rating-system.component.html',
  styleUrls: ['./rating-system.component.scss']
})
export class RatingSystemComponent implements OnInit {
  currentRate:any;
  constructor() { }

  ngOnInit() {
    // initializeRatings()
    this.currentRate = 8;
  }

}
