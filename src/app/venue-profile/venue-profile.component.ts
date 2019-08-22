import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-venue-profile',
  templateUrl: './venue-profile.component.html',
  styleUrls: ['./venue-profile.component.scss']
})
export class VenueProfileComponent implements OnInit {

  venues:Observable<any[]>;

  constructor(private db:AngularFirestore) {
    this.venues = db.collection('Venues').valueChanges();
   }

  ngOnInit() {
  }

}
