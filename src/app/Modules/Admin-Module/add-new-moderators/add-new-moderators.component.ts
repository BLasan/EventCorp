import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-moderators',
  templateUrl: './add-new-moderators.component.html',
  styleUrls: ['./add-new-moderators.component.scss']
})
export class AddNewModeratorsComponent implements OnInit {
  form: any;
  constructor() { }

  ngOnInit() {
    this.form=new FormGroup({
      user_name:new FormControl('',Validators.required),
      contact:new FormControl('',Validators.required),
      f_name:new FormControl('',Validators.required),
      l_name:new FormControl('',[Validators.required]),
      country:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required])
    });  
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

}
