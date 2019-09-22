import { Component, OnInit } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {image_uploader,remove_uploader} from '../../../../scripts/image_uploader';
@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.scss']
})
export class OrganizerProfileComponent implements OnInit {
  form: any;

  constructor() { }

  ngOnInit() {
    deactivate_searchBar();
    this.form=new FormGroup({
      f_name:new FormControl('',Validators.required),
      l_name:new FormControl('',[Validators.required]),
      address:new FormControl('',Validators.required),
      country:new FormControl('',Validators.required),
      state:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email,Validators.required])
      // password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  upload_image(){
    image_uploader();
  }

  remove_image(){
    remove_uploader();
  }

}
