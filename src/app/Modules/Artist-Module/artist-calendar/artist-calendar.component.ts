 import { Component, OnInit } from '@angular/core';
 import {calendar} from '../../../../scripts/artist/artist_calendar.js'
 import { FormGroup, FormControl, Validators } from '@angular/forms';
 import {deactivate_searchBar} from '../../../../scripts/search_bar_activate'
@Component({
  selector: 'app-artist-calendar',
  templateUrl: './artist-calendar.component.html',
  styleUrls: ['./artist-calendar.component.scss']
})
export class ArtistCalendarComponent implements OnInit {

  form:any;
  artist_name:string;
  artist_role:string;
  ngOnInit() {

     calendar({});
     deactivate_searchBar()
     this.artist_name=localStorage.getItem('user_name');
     this.artist_role=localStorage.getItem('role');
     this.form=new FormGroup({
       event_name:new FormControl('',Validators.required),
       venue:new FormControl('',[Validators.required]),
       date:new FormControl('',[Validators.required]),
       time:new FormControl('',[Validators.required]),
       organizer_name:new FormControl('',[Validators.required])
     });

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

}
 

  

