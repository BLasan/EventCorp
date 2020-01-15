import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { init_map} from '../../../scripts/init_map';
@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent implements OnInit,AfterViewInit {

  // @ViewChild('mapContainer') gmap: ElementRef;
  // map: google.maps.Map;
  // lat = 40.730610;
  // lng = -73.935242;
  // coordinates = new google.maps.LatLng(this.lat, this.lng);
  // mapOptions: google.maps.MapOptions = {
  //   center: this.coordinates,
  //   zoom: 8,
  // };
  constructor() { }

  ngOnInit() {
   // init_map();
  }

  ngAfterViewInit() {
    //this.mapInitializer();
   }

  // mapInitializer() {
  //   this.map = new google.maps.Map(this.gmap.nativeElement, 
  //   this.mapOptions);
  //   var marker = new google.maps.Marker({
  //     position: this.coordinates,
  //     map: this.map,
  //   });
  //   marker.setMap(this.map);
  //  }

}
