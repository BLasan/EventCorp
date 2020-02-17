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

  constructor(
    private db: AngularFirestore,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.db.collection('events', ref => ref.where('accepted', '==', 1).where('v_name','==','nelum pokuna')).snapshotChanges()
      .subscribe(result => {
        this.items = result;
        this.itemCount = result.length;
      })
  }

}
