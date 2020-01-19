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
        calendar(event_data)
        // console.log(event_data[0])
        // console.log(event_data===undefined)
        // if(event_data!==undefined){
        //   console.log(data)
        //   calendar(data);
        // }
        // else
        // calendar({});
      });
   });
  }

    //load calendar data
    getData(uid:any):Observable<any[]>{  
      return this.database.collection('register_user').doc(uid).collection('bookings').valueChanges().pipe(
        tap(events=> console.log(events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
        map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
          let data:any=event;
          if(data.paid===true){
            var obj={title:data.event_name,start:new Date(data.date),constraint:data.sender_name};
          }
          return obj;
        }))
      );
    }

}
