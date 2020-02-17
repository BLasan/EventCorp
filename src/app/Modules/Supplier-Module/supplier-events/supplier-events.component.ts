import { Component, OnInit } from '@angular/core';
import {calendar} from '../../../../scripts/artist/artist_calendar.js'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate'
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import CryptoJS from 'crypto-js';
@Component({
  selector: 'app-supplier-events',
  templateUrl: './supplier-events.component.html',
  styleUrls: ['./supplier-events.component.scss']
})
export class SupplierEventsComponent implements OnInit {

  form:any;
  supplier_email:any;
  supplier_role:any;
  constructor(private database:AngularFirestore) { }

  ngOnInit() {

    //load events to the calendar
    this.getData().subscribe(data=>{
      // if(data.length>1)
      console.log(data);
      calendar(data);
      // else
      // calendar({});
    });

   // deactivate_searchBar();
    this.supplier_email=localStorage.getItem('user_name');
    this.supplier_role=localStorage.getItem('role');
    this.form=new FormGroup({
      event_name:new FormControl('',Validators.required),
      venue:new FormControl('',[Validators.required]),
      date:new FormControl('',[Validators.required]),
      time:new FormControl('',[Validators.required]),
      organizer_name:new FormControl('',[Validators.required])
    });
  }

  //reset form
  reset_form(){
    (<HTMLInputElement>document.getElementById('event_name')).value="";
    (<HTMLInputElement>document.getElementById('organizer')).value="";
    (<HTMLInputElement>document.getElementById('venue')).value="";
    (<HTMLInputElement>document.getElementById('date')).value="";
    (<HTMLInputElement>document.getElementById('time')).value="";
  }

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
    const data={id:id,event_name:event_name,date:date,time:time,venue_owners:venue,organzier:organizer,user_name:this.supplier_email};
    this.database.collection('register_user').doc(this.supplier_email).collection('MyEvents').doc(id).set(data).then(function(docs) {
      _this.form.reset();
       _this.reset_form();
    })
    .catch(function(error) {
      alert('An error occured.Please retry!')
      console.error("Error writing document: ", error);
    });
  }

  //error detecton
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

    //load calendar data
    getData():Observable<any[]>{  
      return this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').valueChanges().pipe(
        tap(doc=> console.log(doc)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
        map(doc => doc.map(doc => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
          let data:any=doc;
          let obj:any;
          if(data.paid===true){
            obj={title:data.event_name,start:new Date(data.date),constraint:data.sender_name};
          }
          else obj={}
          return obj;
        }))
      );
    }

}
