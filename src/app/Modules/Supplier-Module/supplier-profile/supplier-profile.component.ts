import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SupplierProfileService } from 'app/services/supplier-services.service';
import {image_uploader,remove_uploader} from '../../../../scripts/image_uploader'
@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.scss']
})
export class SupplierProfileComponent implements OnInit {

  form: any;
  user_profile:any;
  user_events:any;
  username:string;
  isEmptyUserEvents:boolean=false
  constructor(private _supplier_services:SupplierProfileService) { }

  ngOnInit() {
    this.loadUserProfile();
    // this.loadUserEvents();
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

  // loadUserEvents(){
  //   let user_name=localStorage.getItem("user_name");
  //   this._supplier_services.loadEvents(user_name).subscribe((data)=>{
  //     this.user_events=data;
  //     if(!this.user_events) this.isEmptyUserEvents=true;
  //     console.log(this.user_events.data[0]+"=>EVENTS");
  //     });
  // }

  loadUserProfile(){
    this._supplier_services.loadUserProfile(localStorage.getItem('user_name')).subscribe(data=>{
      this.user_profile=data;
     
    })
  }

  

}
