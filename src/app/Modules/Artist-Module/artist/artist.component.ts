import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import {image_uploader,remove_uploader} from '../../../../scripts/image_uploader'
import { OrganizerServiceService } from 'app/services/organizer_services.service';
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
  username:string;
  constructor(private _organizer_services:OrganizerServiceService) { 
   
  }


  ngOnInit() {
    deactivate_searchBar();
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

  loadUserProfile(){
    this._organizer_services.loadUserProfile(localStorage.getItem('user_name')).subscribe(data=>{
      this.user_profile=data;
      console.log(this.user_profile.data.img_url)
    })
  }

  

  }
  


