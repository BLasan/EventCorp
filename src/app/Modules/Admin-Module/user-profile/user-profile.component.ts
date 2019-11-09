import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ProfileService } from 'app/services/organizer_services.service';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  form: any;
  user_profile:any;
  user_events:any;
  username:string;
  constructor(private _organizer_services:ProfileService) { 
   
  }

  ngOnInit() {
    deactivate_searchBar();
    this.loadUserProfile();
    this.form=new FormGroup({
      user_name:new FormControl('',Validators.required),
      contact:new FormControl('',Validators.required),
      f_name:new FormControl('',Validators.required),
      l_name:new FormControl('',[Validators.required]),
      address:new FormControl('',Validators.required),
      country:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email,Validators.required])
      // password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    });  
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  loadUserProfile(){
    this._organizer_services.loadUserProfile(localStorage.getItem('user_name')).subscribe(data=>{
      this.user_profile=data;
      this.username=this.user_profile.user_name;
      console.log(this.user_profile.data.email+"=>PROFILE")
    })
  }
  


}
