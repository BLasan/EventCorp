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
    // this.createForm();

    var docRef = this.db.collection('register_user').doc(this.loginService.currentUser()).collection('venue').doc('hall').snapshotChanges();
    docRef.subscribe(resultss => {
      this.item = resultss.payload.data();
        this.item.id = resultss.payload.id;
        console.log("Document data:", this.item);
        console.log("Document data:", this.item.id);
        this.createForm();

      // if (doc.exists) {
      //     console.log("Document data:", doc.data());
      // } else {
      //     // doc.data() will be undefined in this case
      //     console.log("No such document!");
      // }
  });
  // this.createForm();

    // this.db.collection('register_user').doc(this.loginService.currentUser()).collection("venue").doc("hall").get()
    //   .then(function(doc) {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
        // this.itemz = result;
        // console.log("itemz - ",this.itemz);
        // this.venue_name = result.data().v_name;
        // console.log("result - ", this.venue_name);
        // this.firebaseService.getVenueDocId(this.venue_name)
        // .subscribe(output => {
        //   this.itemId = output.id;
        //   console.log("output ID - ",this.itemId);
        // })
        // this.db.collection("Venues").get().subscribe(function (querySnapshot) {
        //   querySnapshot.forEach(function (doc) {
        //     // this.venueId = doc.data().venue_name;
        //     console.log(this.venue_name);
        //     if (doc.data().nameToSearch == this.venue_name) {
        //       this.itemId = doc.id;
        //       console.log("found doc id ------- > ", this.itemId);
        //     }
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        //   });
        // });
      // })
    // this.route.data.subscribe(routeData => {
    //   let data = routeData['data'];
    //   if (data) {
    //     this.item = data.payload.data();
    //     this.item.id = data.payload.id;
    //     this.createForm();
    //   }
    // })
  }

  findVenueID(vname) {
    this.db.collection("Venues").get().subscribe(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // this.venueId = doc.data().venue_name;
        console.log(vname);
        if (doc.data().nameToSearch == vname) {
          this.itemId = doc.id;
          console.log("found doc id ------- > ", this.itemId);
        }
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });

  }

  createForm() {
    this.myForm1 = this.fb.group({
      // name: [this.item.name, Validators.required],
      // surname: [this.item.surname, Validators.required],
      // age: [this.item.age, Validators.required]
      v_name: [this.item.v_name, Validators.required],
      venue_address: [this.item.venue_address, Validators.required],
      tel_no: [this.item.tel_no, Validators.required],
      ac: [this.item.ac, Validators.required],
      car_parking: [this.item.car_parking, Validators.required],
      fee: [this.item.fee, Validators.required],
      seating_capacity: [this.item.seating_capacity, Validators.required]
    });
  }

  onSubmit(value) {
    // value.avatar = this.item.avatar;
    // value.age = Number(value.age);
    // this.firebaseService.updateUser(this.item.id, value);
    console.log("onsubmit id - ",this.item.id);
    this.firebaseService.updateUser(this.item.id, value);
    this.success = true;

    // .then(
    //   res => {
    //     this.router.navigate(['/home']);
    //   }
    // )
    // this.db.collection('register_user').doc(this.loginService.currentUser())
    //   .get().subscribe(result => {
    //     this.venue_name = result.data().v_name;
    //     console.log("result - ", this.venue_name);
    //     this.findVenueID(this.venue_name);
    //   })

  }

}
