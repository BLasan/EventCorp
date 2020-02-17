import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from 'app/services/login.services';

@Component({
  selector: 'app-venue-dashboard',
  templateUrl: './venue-dashboard.component.html',
  styleUrls: ['./venue-dashboard.component.scss']
})
export class VenueDashboardComponent implements OnInit {

  items: Array<any>;
  itemCount: any;
  total_Bookings: any;
  start: any;
  end: any;


  constructor(
    private db:AngularFirestore,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getRequests();
    this.totalBookings();
  }

  getRequests(){

//     var citiesRef = this.db.collection("cities");

// var query = citiesRef.where("capital", "==", true);
    this.db.collection('events',ref => ref.where('accepted','==',0)).snapshotChanges()
    .subscribe(result => {
      this.items = result;
      this.itemCount = result.length;
    })
  }

  totalBookings(){
    this.db.collection('events',ref => ref.where('accepted','==',1).where('v_name','==','nelum pokuna')).snapshotChanges()
    .subscribe(result => {
      // this.items = result;
      this.total_Bookings = result.length;
    })
  }

  acceptRequest(itemid){
    this.db.collection('events').doc(itemid).update({
      accepted:1,
    });
    console.log(itemid);
  }

  declineRequest(itemid){
    this.db.collection('events').doc(itemid).update({
      accepted:2,
    });
    console.log(itemid);
  }

}
