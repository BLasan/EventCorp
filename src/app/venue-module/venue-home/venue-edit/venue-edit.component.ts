import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VenueHomeService } from '../venue-home.service';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from 'app/services/login.services';

@Component({
  selector: 'app-venue-edit',
  templateUrl: './venue-edit.component.html',
  styleUrls: ['./venue-edit.component.scss']
})
export class VenueEditComponent implements OnInit {

  myForm1: FormGroup;
  item: any;
  venue_name: any;
  venueId: any;
  itemId: any;
  itemz: any;
  success = false;

  constructor(
    private db: AngularFirestore,
    private loginService: LoginService,
    public firebaseService: VenueHomeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog

  ) { }

  ngOnInit() {

    //getting the necessary data to fill the edit form
    var docRef = this.db.collection('register_user').doc(this.loginService.currentUser()).collection('venue').doc('hall').snapshotChanges();
    docRef.subscribe(resultss => {
      this.item = resultss.payload.data();
        this.item.id = resultss.payload.id;
        console.log("Document data:", this.item);
        console.log("Document data:", this.item.id);
        this.createForm();

  });
  
  }  

  // findVenueID(vname) {
  //   this.db.collection("Venues").get().subscribe(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       console.log(vname);
  //       if (doc.data().nameToSearch == vname) {
  //         this.itemId = doc.id;
  //         console.log("found doc id ------- > ", this.itemId);
  //       }
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   });

  // }

  //creating the form with loaded data
  createForm() {
    this.myForm1 = this.fb.group({
      
      v_name: [this.item.v_name, Validators.required],
      nameToSearch: [this.item.v_name.toLowerCase(), Validators.required],
      venue_address: [this.item.venue_address, Validators.required],
      tel_no: [this.item.tel_no, Validators.required],
      ac: [this.item.ac, Validators.required],
      car_parking: [this.item.car_parking, Validators.required],
      fee: [this.item.fee, Validators.required],
      seating_capacity: [this.item.seating_capacity, Validators.required]
    });
  }

  //submitting the edited form
  onSubmit(value) {    
    console.log("onsubmit id - ",this.item.id);
    this.firebaseService.updateUser(this.item.id, value);
    this.success = true;

  }

}
