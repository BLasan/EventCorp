import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-query-reply-dialog',
  templateUrl: './query-reply-dialog.component.html',
  styleUrls: ['./query-reply-dialog.component.scss']
})
export class QueryReplyDialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<QueryReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data             //retriving the data which was passed into this component from moderator-queries componenet
  ) {
    this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
      // ...
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
    // this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
