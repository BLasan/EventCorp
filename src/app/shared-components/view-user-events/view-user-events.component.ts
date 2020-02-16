import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import {calendar} from '../../../scripts/artist/artist_calendar.js'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-user-events',
  templateUrl: './view-user-events.component.html',
  styleUrls: ['./view-user-events.component.scss']
})
export class ViewUserEventsComponent implements OnInit {

  count:number=0;
  constructor(private database:AngularFirestore,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getData(params.uid).subscribe(data=>{
        let event_data=data;
        console.log(data)

        //insert data to the calendar
        calendar(event_data);
      
      });
   });
  }

    //load calendar data
    getData(uid:any):Observable<any[]>{ 
      //alert(uid) 
      return this.database.collection('register_user').doc(uid).collection('bookings').valueChanges().pipe(map(events=>events.map(event => {
        let data:any=event;
        let obj:any;
        if(data.paid==true)
        obj={title:data.event_name,start:new Date(data.date),constraint:"Musical Show"}
        else 
        obj={}
        return obj;
      })));
    }

}
