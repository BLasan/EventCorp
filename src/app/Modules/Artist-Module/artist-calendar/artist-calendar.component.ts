import { Component, OnInit } from '@angular/core';
import {calendar} from '../../../../scripts/artist/artist_calendar.js'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate'
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import CryptoJS from 'crypto-js';
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

    //fetch data
    this.getData().subscribe(data=>{
      calendar(data);
    });

   // deactivate_searchBar()
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


  //load calendar data
  getData():Observable<any[]>{  

    return this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').valueChanges().pipe(
      tap(events=> console.log(events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
      map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
        let data:any=event;
        let obj:any;
          if(data.paid===true){
            obj={title:data.event_name,start:new Date(data.date),constraint:data.sender_name};
          }
          else obj={}
          return obj;
      }))
    );
  }

  //error detection
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }


  //create events
  onSubmit(){
    let event_name=this.form.get('event_name').value;
    let venue=this.form.get('venue').value;
    let date=this.form.get('date').value;
    date=new Date(date).getFullYear()+"-"+new Date(date).getMonth()+"-"+new Date(date).getDate();
    console.log(date);
    let time=this.form.get('time').value;
    let organizer=this.form.get('organizer_name').value;
    let id=date+"@"+event_name+localStorage.getItem('user_name');
    id=id.replace(/[/]/g,'$');
    id=CryptoJS.SHA256(id).toString();
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

  //reset the form
  reset_form(){
    (<HTMLInputElement>document.getElementById('event_name')).value="";
    (<HTMLInputElement>document.getElementById('organizer')).value="";
    (<HTMLInputElement>document.getElementById('venue')).value="";
    (<HTMLInputElement>document.getElementById('date')).value="";
    (<HTMLInputElement>document.getElementById('time')).value="";
  }

}
 

  

