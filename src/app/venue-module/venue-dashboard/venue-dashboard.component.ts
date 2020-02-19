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
  our_venue: any;
  outputResult: any;


  constructor(
    private db: AngularFirestore,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getRequests();
    this.totalBookings();
  }

  getRequests() {

    this.db.collection('register_user').doc(this.loginService.currentUser()).collection('venue').doc('hall').snapshotChanges()
      .subscribe(output => {
        this.outputResult = output.payload.data();
        this.our_venue = this.outputResult.nameToSearch;
        // console.log("ddddddddddddddddddd", this.our_venue);
        
        this.db.collection('events', ref => ref.where('accepted', '==', 0).where('nameToSearch', '==', this.our_venue)).snapshotChanges()
          .subscribe(result => {
            // console.log("dsdgsdgsgsgsgsg - ", this.our_venue);
            this.items = result;
            this.itemCount = result.length;
          })
      })

    // this.db.collection('events',ref => ref.where('accepted','==',0).where('nameToSearch','==',this.our_venue)).snapshotChanges()
    // .subscribe(result => {
    //   console.log("dsdgsdgsgsgsgsg - ",this.our_venue);
    //   this.items = result;
    //   this.itemCount = result.length;
    // })

  }

  totalBookings() {

    this.db.collection('register_user').doc(this.loginService.currentUser()).collection('venue').doc('hall').snapshotChanges()
      .subscribe(output => {
        this.outputResult = output.payload.data();
        this.our_venue = this.outputResult.nameToSearch;
        console.log("bookings  ddddddddddddddddddd", this.our_venue);
        
        this.db.collection('events', ref => ref.where('accepted', '==', 1).where('nameToSearch', '==', this.our_venue)).snapshotChanges()
          .subscribe(result => {
            console.log("bookings LAST dsdgsdgsgsgsgsg - ", this.our_venue);
            this.total_Bookings = result.length;
          })
      })

    // this.db.collection('events', ref => ref.where('accepted', '==', 1).where('v_name', '==', 'St. Joesphs College Sports Complex')).snapshotChanges()
    //   .subscribe(result => {
    //     // this.items = result;
    //     this.total_Bookings = result.length;
    //   })
  }

  acceptRequest(itemid) {
    this.db.collection('events').doc(itemid).update({
      accepted: 1,
    });
    console.log(itemid);
  }

  declineRequest(itemid) {
    this.db.collection('events').doc(itemid).update({
      accepted: 2,
    });
    console.log(itemid);
  }

}
