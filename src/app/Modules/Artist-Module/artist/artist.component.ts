import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import {image_uploader,remove_uploader} from '../../../../scripts/image_uploader'
import { ProfileService } from 'app/services/organizer_services.service';
// import {getBioData,removeStorage,getAlbumData} from '../../../scripts/artist/artist_get_data';

// declare function removeStorage():any;

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})

export class ArtistComponent implements OnInit {
  
  form: any;
  user_profile:any;
  user_events:any;
  username:string;
  isEmptyUserEvents:boolean=false
  constructor(private _organizer_services:ProfileService) { 
   
  }


  ngOnInit() {
    deactivate_searchBar();
    this.loadUserProfile();
    this.loadUserEvents();
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

  loadUserEvents(){
    let user_name=localStorage.getItem("user_name");
    this._organizer_services.loadEvents(user_name).subscribe((data)=>{
      this.user_events=data;
      if(!this.user_events) this.isEmptyUserEvents=true;
      console.log(this.user_events.data[0]+"=>EVENTS");
      });
  }

  loadUserProfile(){
    this._organizer_services.loadUserProfile(localStorage.getItem('user_name')).subscribe(data=>{
      this.user_profile=data;
      console.log(this.user_profile.data.email+"=>PROFILE")
    })
  }
  

  }
  


