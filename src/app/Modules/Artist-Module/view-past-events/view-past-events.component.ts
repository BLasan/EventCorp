import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-past-events',
  templateUrl: './view-past-events.component.html',
  styleUrls: ['./view-past-events.component.scss']
})
export class ViewPastEventsComponent implements OnInit {

  events_array:any=[];
  isLoaded:boolean=false;
  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.load_events();
  }


  //get events
  load_events(){
    var _this=this;
    this.db.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').get().then(doc=>{
      if(!doc.empty){
        doc.forEach(docs=>{
          _this.events_array.push(docs.data());
        })
      }
      _this.isLoaded=true;
    }).catch(err=>{
      console.log(err);
      _this.isLoaded=true;
    })
  }

}
