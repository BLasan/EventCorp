import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { tap, first } from "rxjs/operators";
import { LoginService } from "app/services/login.services";

@Component({
  selector: "app-venue-add",
  templateUrl: "./venue-add.component.html",
  styleUrls: ["./venue-add.component.scss"]
})
export class VenueAddComponent implements OnInit {
  myForm1: FormGroup;

  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    //creating the form
    this.myForm1 = this.fb.group({
      v_name: ["", Validators.required],
      venue_address: ["", Validators.required],
      tel_no: ["", Validators.required],
      ac: ["", Validators.required],
      car_parking: ["", Validators.required],
      fee: ["", Validators.required],
      seating_capacity: ["", Validators.required]
    });

    // this.preloadData(); //storing data in the database is working even WITHOUT this function
  }

  //form submit function
  async submitHandler1() {
    
    this.loading = true;
    const formValue = this.myForm1.value;

    try {
      this.createDocumentAtUser(formValue);
      this.createDocumentAtVenues(formValue);
      this.success = true;
      
    } catch (err) {
      console.error(err);
    }

    this.loading = false;
  }

  //submitting data to venues collection
  createDocumentAtVenues(value) {
    return this.afs.collection("Venues").add({
      v_name: value.v_name,
      nameToSearch: value.v_name.toLowerCase(),
      venue_address: value.venue_address,
      tel_no: parseInt(value.tel_no, 10),
      ac: value.ac,
      car_parking: value.car_parking,
      fee: parseInt(value.fee, 10),
      seating_capacity: parseInt(value.seating_capacity, 10)
    });
  }

  //submitting data to register_user collection
  createDocumentAtUser(value) {
    return this.afs
      .collection("register_user")
      .doc(this.loginService.currentUser())
      .collection("venue")
      .doc("hall")
      .set({
        v_name: value.v_name,
        nameToSearch: value.v_name.toLowerCase(),
        venue_address: value.venue_address,
        tel_no: parseInt(value.tel_no, 10),
        ac: value.ac,
        car_parking: value.car_parking,
        fee: parseInt(value.fee, 10),
        seating_capacity: parseInt(value.seating_capacity, 10)
      });
  }

  // preloadData() {
  //   //storing data in the database is working even WITHOUT this function
  //   this.afs
  //     .doc("Venues/Kjn0JWBKdOnUlBwuE93S")
  //     .valueChanges()
  //     .pipe(
  //       tap(data => {
  //         this.myForm1.patchValue(data);
  //       })
  //     )
  //     .subscribe();
  // }
}
