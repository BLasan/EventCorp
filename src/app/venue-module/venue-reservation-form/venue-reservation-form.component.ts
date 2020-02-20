import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, first } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginService } from 'app/services/login.services';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

interface Officer {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-venue-reservation-form',
  templateUrl: './venue-reservation-form.component.html',
  styleUrls: ['./venue-reservation-form.component.scss']
})
export class VenueReservationFormComponent implements OnInit {

  myForm: FormGroup;

  loading = false;
  success = false;

  officers: Officer[] = [
    {value: 'Mr. Ajith Prasanna', viewValue: 'Mr. Ajith Prasanna'},
    {value: 'Mr. Kapila De Silva', viewValue: 'Mr. Kapila De Silva'},
    {value: 'Mr. Prasanna Rathnayake', viewValue: 'Mr. Prasanna Rathnayake'}
  ];


  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private loginService: LoginService) { }

  ngOnInit() {

    //creating the form
    this.myForm = this.fb.group({

      title: ['', Validators.required],
      v_name: ['', Validators.required],
      event_start: ['', Validators.required],
      event_end: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      hall: ['', Validators.required],
      seats_number_balcony: ['', Validators.required],
      seats_number_odc: ['', Validators.required],
      person_name: ['', Validators.required],
      address: ['', Validators.required],
      tel_no: ['', Validators.required],
      assigned_officer: ['', Validators.required],      
      accepted: 0

    })    

  }

  //submitting the form
  async submitHandler() {
    this.loading = true;

    const formValue = this.myForm.value;

    try {
      await this.afs.collection('events').add({
        title: formValue.title,
        v_name: formValue.v_name,
        event_start: formValue.event_start,
        event_end: formValue.event_end,
        start_time: formValue.start_time,
        end_time: formValue.end_time,
        hall: formValue.hall,
        seats_number_balcony: formValue.seats_number_balcony,
        seats_number_odc: formValue.seats_number_odc,
        person_name: formValue.person_name,
        address: formValue.address,
        tel_no: formValue.tel_no,
        assigned_officer: formValue.assigned_officer,
        nameToSearch: formValue.v_name.toLowerCase(),
        accepted: 0
      }); 
      this.success = true;
    } catch (err) {
      console.error(err)
    }

    this.loading = false;
  }
  

}
