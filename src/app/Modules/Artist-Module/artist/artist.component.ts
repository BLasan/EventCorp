import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import {getBioData,removeStorage,getAlbumData} from '../../../scripts/artist/artist_get_data';

// declare function removeStorage():any;

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})

export class ArtistComponent implements OnInit {
  form_data:any=[{"name":null,"address":null,"city":null,"email":" ","country":null,"contact":" "},{"validName":true,"validAddress":true,"validCity":true,"validEmail":true,"validCountry":true,"validContact":true,"validPassword":true}];
  socket:any;
  socket1:any;
  socket2:any;
  initialText:String="<Empty List>"
  bio_data:any={"company":null,"web_site":null,"location":null,"bio":null};
  album_data:any=[{"title":null,"date":null,"location":null,"path":null}];
  form: any;

  constructor() { 
   
  }


  ngOnInit() {

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

  }
  


