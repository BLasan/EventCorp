import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
declare const google: any;
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  }
  
@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss']
})
export class UserLocationComponent implements OnInit {

  lat=6.9047898;
  long= 79.8781474;
  user_role:string;
  user_name:string;
  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.user_name=localStorage.getItem('nameId');
    this.user_role=localStorage.getItem('role');
    this.getUserAddress();
  }

  //get user address
  getUserAddress(){
    var _this=this;
    this.db.firestore.collection('register_user').doc(localStorage.getItem('user_name')).get().then(doc=>{
      let address=doc.data().city;
      _this.initMap(address);
    }).catch(err=>{
      console.log(err);
    })
  }

  //init Map
  initMap(address:string){
    var geocoder = new google.maps.Geocoder;
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //       this.lat=position.coords.latitude;
    //       this.long=position.coords.longitude;
    //   });
    // }

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
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
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
