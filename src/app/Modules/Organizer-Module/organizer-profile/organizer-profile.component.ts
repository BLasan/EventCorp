import { Component, OnInit } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {image_uploader,remove_uploader} from '../../../../scripts/image_uploader';
import { SignupService } from 'app/services/signup.service';
import { MatSnackBar } from '@angular/material';
import { OrganizerServiceService } from 'app/services/organizer_services.service';
@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.scss']
})
export class OrganizerProfileComponent implements OnInit {
  form: any;
  user_name:string;
  my_bio:any;
  userbio:any;
  username:string;
  user_events:any=[];
  user_profile:any;
  constructor(private _updateData:SignupService,private _snackbar:MatSnackBar,private _organizer_services:OrganizerServiceService) { }

  ngOnInit() {
    deactivate_searchBar();
    this.loadUserEvents();
    this.loadUserProfile();
    this.username=localStorage.getItem('nameId');
    this.form=new FormGroup({
      f_name:new FormControl('',Validators.required),
      l_name:new FormControl('',[Validators.required]),
      address:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
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

  getOrganizerDetails(){
    let first_name= (<HTMLInputElement>document.getElementById('f_name')).value;
    let last_name= (<HTMLInputElement>document.getElementById('l_name')).value;
    let user_name=first_name+" "+last_name;
    let user_email= (<HTMLInputElement>document.getElementById('email')).value;
    let user_address= (<HTMLInputElement>document.getElementById('address')).value;
    let user_city= (<HTMLInputElement>document.getElementById('city')).value;
    let user_state= (<HTMLInputElement>document.getElementById('state')).value;
    let user_contact= (<HTMLInputElement>document.getElementById('contact')).value;
    let bio=this.my_bio;
    let user_details={user_name:user_name,email:user_email,address:user_address,city:user_city,state:user_state,contact:user_contact,bio:bio};
    this._updateData.updateData(user_details).subscribe(data=>{
      let success_mesage:any=data;
      if(success_mesage.success==true){
        this.username=success_mesage.user_name;
        this.userbio=success_mesage.bio;
        this._snackbar.open("Successfully Updated","OK", {
          duration: 3000,
        });
      }
      else{
        this._snackbar.open("Update Failed","OK", {
          duration: 3000,
        });
      }
    })
  }

  loadUserEvents(){
    let user_name=localStorage.getItem("user_name");
    this._organizer_services.loadEvents(user_name).subscribe((data)=>{
      this.user_events=data;
      console.log(this.user_events.data[0]);
      });
  }

  loadUserProfile(){
    this._organizer_services.loadUserProfile(localStorage.getItem('user_name')).subscribe(data=>{
      this.user_profile=data;
    })
  }


}
