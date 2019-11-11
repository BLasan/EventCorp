import { Component, OnInit } from '@angular/core';
import {calendar} from '../../../../scripts/artist/artist_calendar.js'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate'
import { AngularFirestore } from '@angular/fire/firestore';
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
    calendar({});
    deactivate_searchBar();
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
    date=date.getTime();
    console.log(date);
    let time=this.form.get('time').value;
    let organizer=this.form.get('organizer_name').value;
    let id=date+"@"+event_name;
    id=id.replace(/[/]/g,'$');
    console.log("ID->"+id);
    var _this=this;
    const data={id:id,event_name:event_name,date:date,time:time,venue_owners:venue,organzier:organizer,user_name:this.supplier_email};
    this.database.collection('register_user').doc(this.supplier_email).collection('MyEvents').doc(id).set(data).then(function(docs) {
       _this.reset_form();
    })
    .catch(function(error) {
      alert('An error occured.Please retry!')
      console.error("Error writing document: ", error);
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

}
