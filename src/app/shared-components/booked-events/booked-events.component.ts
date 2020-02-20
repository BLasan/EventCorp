import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-booked-events',
  templateUrl: './booked-events.component.html',
  styleUrls: ['./booked-events.component.scss']
})
export class BookedEventsComponent implements OnInit,AfterViewInit {

  isEmpty:boolean=false;
  events_array:any=[];
  searchBookedEvents:string;
  filtered_data:any=[];
  isModalOpen:boolean=false;
  isLoaded:boolean=false;
  constructor(private database:AngularFirestore) { }

  ngOnInit() {
    document.getElementById('search_bar').setAttribute('style','display:none');
  }

  ngAfterViewInit(){
    this.getEvents();
  }


  //get booked-events
  getEvents(){
    var _this=this;
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').get().then(snapshot=>{
      
      if(snapshot.empty) _this.isEmpty=true;
      else{
        snapshot.forEach(docs=>{
          if(docs.data().paid===true){
            _this.events_array.push(docs.data());
            _this.events_array=_this.events_array.sort((a,b)=>{return a-b});
          }
        })
      }
      _this.isLoaded=true;
      console.log(_this.events_array.length)
    })
  }

}
