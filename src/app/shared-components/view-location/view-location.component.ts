import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { init_map} from '../../../scripts/init_map';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
declare const google: any;
@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent implements OnInit{
  
  lat=6.9047898;
  long= 79.8781474;
  user_role:string;
  user_name:string;
  constructor(private db:AngularFirestore,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id=params.uid;
      console.log(id)
      this.getUserAddress(id);
   });
  }

  //get user address
  getUserAddress(id){
    var _this=this;
    this.db.firestore.collection('register_user').doc(id).get().then(doc=>{
      let address=doc.data().city;
      console.log(address)
      _this.initMap(address);
    }).catch(err=>{
      console.log(err);
    })
  }

//init Map
initMap(address:string){
console.log(address)
  var geocoder = new google.maps.Geocoder;
  var myLatlng = new google.maps.LatLng(this.lat,this.long);
  var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [{
          "featureType": "water",
          "stylers": [{
              "saturation": 43
          }, {
              "lightness": -11
          }, {
              "hue": "#0088ff"
          }]
      }, {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{
              "hue": "#ff0000"
          }, {
              "saturation": -100
          }, {
              "lightness": 99
          }]
      }, {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{
              "color": "#808080"
          }, {
              "lightness": 54
          }]
      }, {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#ece2d9"
          }]
      }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#ccdca1"
          }]
      }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#767676"
          }]
      }, {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{
              "color": "#ffffff"
          }]
      }, {
          "featureType": "poi",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [{
              "visibility": "on"
          }, {
              "color": "#b8cb93"
          }]
      }, {
          "featureType": "poi.park",
          "stylers": [{
              "visibility": "on"
          }]
      }, {
          "featureType": "poi.sports_complex",
          "stylers": [{
              "visibility": "on"
          }]
      }, {
          "featureType": "poi.medical",
          "stylers": [{
              "visibility": "on"
          }]
      }, {
          "featureType": "poi.business",
          "stylers": [{
              "visibility": "simplified"
          }]
      }]

  };
  console.log(document.getElementById("map"))
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          title:"Location"
      });
      marker.setMap(map);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  // var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     title: this.user_name
  // })

    // To add the marker to the map, call setMap();
    //marker.setMap(map);
  }


}
