import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, first } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginService } from 'app/services/login.services';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-venue-reservation-form',
  templateUrl: './venue-reservation-form.component.html',
  styleUrls: ['./venue-reservation-form.component.scss']
})
export class VenueReservationFormComponent implements OnInit {

  myForm: FormGroup;

  loading = false;
  success = false;

  // name = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private loginService: LoginService) { }

  ngOnInit() {

    this.myForm = this.fb.group({

      title: ['', Validators.required],
      v_name: ['', Validators.required],
      event_start: ['', Validators.required],
      event_end: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      hall: ['', Validators.required],
      seats_number: ['', Validators.required],
      person_name: ['', Validators.required],
      address: ['', Validators.required],
      tel_no: ['', Validators.required],
      assigned_officer: ['', Validators.required],
      // venue_owner: this.loginService.currentUser(),
      // venue_name: "abc",
      accepted: 0

    })

    this.preloadData();     //storing data in the database is working even WITHOUT this function

  }

  async submitHandler() {
    this.loading = true;

    const formValue = this.myForm.value;

    // try {
    //   await this.afs.collection('register_user').doc(this.loginService.currentUser()).collection('MyEvents').add(formValue); //here add() is used to add a document with an auto generated id. To add a form with user specific id, u need to use doc('user-specific-doc-id').set(formValue)
    //   this.success = true;
    // } catch(err) {
    //   console.error(err)
    // }

    try {
      await this.afs.collection('events').add({
        title: formValue.title,
        v_name: formValue.v_name,
        event_start: formValue.event_start,
        event_end: formValue.event_end,
        start_time: formValue.start_time,
        end_time: formValue.end_time,
        hall: formValue.hall,
        seats_number: formValue.seats_number,
        person_name: formValue.person_name,
        address: formValue.address,
        tel_no: formValue.tel_no,
        assigned_officer: formValue.assigned_officer,
        nameToSearch: formValue.v_name.toLowerCase(),
        accepted: 0
      }); //here add() is used to add a document with an auto generated id. To add a form with user specific id, u need to use doc('user-specific-doc-id').set(formValue)
      this.success = true;
    } catch (err) {
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
