import { Component, OnInit } from '@angular/core';
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
  selector: 'app-events-add',
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.scss']
})
export class EventsAddComponent implements OnInit {

  myForm: FormGroup;

  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private loginService: LoginService
  ) { }

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
      await this.afs.collection('register_user').doc(this.loginService.currentUser()).collection('events').add(formValue); //here add() is used to add a document with an auto generated id. To add a form with user specific id, u need to use doc('user-specific-doc-id').set(formValue)
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
