 import { Component, OnInit } from '@angular/core';
 import {calendar} from '../../../../scripts/artist/artist_calendar.js'
 import { FormGroup, FormControl, Validators } from '@angular/forms';
 import {deactivate_searchBar} from '../../../../scripts/search_bar_activate'
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-artist-calendar',
  templateUrl: './artist-calendar.component.html',
  styleUrls: ['./artist-calendar.component.scss']
})
export class ArtistCalendarComponent implements OnInit {

  form:any;
  artist_email:string;
  artist_role:string;
  constructor(private database:AngularFirestore){}
  ngOnInit() {

     calendar({});
     deactivate_searchBar()
     this.artist_email=localStorage.getItem('user_name');
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

  onSubmit(){
    let event_name=this.form.get('event_name').value;
    let venue=this.form.get('venue').value;
    let date=this.form.get('date').value;
    date=date.getTime();
    console.log(date);
    let time=this.form.get('time').value;
    let organizer=this.form.get('organizer_name').value;
    let id=date+"@"+event_name;
    id=id.replace(/[/]/g,'$');
    console.log("ID->"+id);
    var _this=this;
    const data={id:id,event_name:event_name,date:date,time:time,venue_owners:venue,organzier:organizer,user_name:this.artist_email};
    this.database.collection('register_user').doc(this.artist_email).collection('MyEvents').doc(id).set(data).then(function(docs) {
       _this.reset_form();
    })
    .catch(function(error) {
      alert('An error occured.Please retry!')
      console.error("Error writing document: ", error);
    });
  }

  reset_form(){
    (<HTMLInputElement>document.getElementById('event_name')).value="";
    (<HTMLInputElement>document.getElementById('organizer')).value="";
    (<HTMLInputElement>document.getElementById('venue')).value="";
    (<HTMLInputElement>document.getElementById('date')).value="";
    (<HTMLInputElement>document.getElementById('time')).value="";
  }

}
 

  

