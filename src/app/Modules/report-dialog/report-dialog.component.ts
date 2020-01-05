import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { VenueHomeService } from '../../venue-module/venue-home/venue-home.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  item: any;
  comments: any;
  index: any;

  // options: string[] = ['Unwanted commercial content or spam', 'Hate Speech', 'Harressment or bullying'];

  constructor(
    private formBuilder: FormBuilder,
    private venueHomeService: VenueHomeService,
    @Inject(MAT_DIALOG_DATA) data,
    private db: AngularFirestore,

  ) {
    this.index = data.idx;
    
  }

  ngOnInit() {
    console.log("ggggggggg - "+this.index)
    // this.db.collection('Venues').doc(this.item.id).collection('comments').valueChanges()
    // .subscribe(result => {
    //   this.comments = result;
    //   // result[this.index]
    //   console.log('RRRComments - ',result[this.index]);
    // })
  }

  //Create a form
  form = this.formBuilder.group({
    reportOption: ['', Validators.required],
  });

  onFormSubmit() {
    // console.log("Form Value"+this.form.value.toString());
    this.venueHomeService.savePerson(this.form.value);
  }

  get reportOption() {
    return this.form.get('reportOption');
  } 

}
