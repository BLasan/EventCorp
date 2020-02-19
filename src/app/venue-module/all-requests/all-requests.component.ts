import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from 'app/services/login.services';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit {

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
  }

  //getting requests
  getRequests() {

    this.db.collection('register_user').doc(this.loginService.currentUser()).collection('venue').doc('hall').snapshotChanges()
      .subscribe(output => {
        this.outputResult = output.payload.data();
        this.our_venue = this.outputResult.nameToSearch;
        
        this.db.collection('events', ref => ref.where('accepted', '==', 1).where('nameToSearch', '==', this.our_venue)).snapshotChanges()
          .subscribe(result => {
            this.items = result;
            this.itemCount = result.length;
          })
      })

  }

}
