import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, first } from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';




@Component({
  selector: 'app-venue-reservation-form',
  templateUrl: './venue-reservation-form.component.html',
  styleUrls: ['./venue-reservation-form.component.scss']
})
export class VenueReservationFormComponent implements OnInit {

  myForm : FormGroup;

  loading = false;
  success = false;

  // name = new FormControl('');

  constructor(private fb: FormBuilder, private afs: AngularFirestore) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      
      title: ['',Validators.required],
      event_start: ['',Validators.required],
      event_end: ['',Validators.required],
      start_time: ['',Validators.required],
      end_time: ['',Validators.required],
      hall: ['',Validators.required],
      seats_number: ['',Validators.required],
      person_name: ['',Validators.required],
      address: ['',Validators.required],
      tel_no: ['',Validators.required],
      assigned_officer: ['',Validators.required]

    })

    this.preloadData();     //storing data in the database is working even WITHOUT this function

  }

  async submitHandler() {
    this.loading = true;

    const formValue = this.myForm.value;

    try {
      await this.afs.collection('events').add(formValue);
      this.success = true;
    } catch(err) {
      console.error(err)
    }

    this.loading = false;
  }

  preloadData() {           //storing data in the database is working even WITHOUT this function
    this.afs.doc('events/Kjn0JWBKdOnUlBwuE93S').valueChanges().pipe(
      tap(data => {
        this.myForm.patchValue(data)
      })
    )
    .subscribe()
  }

}
