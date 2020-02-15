import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-show-venue',
  templateUrl: './show-venue.component.html',
  styleUrls: ['./show-venue.component.scss']
})
export class ShowVenueComponent implements OnInit {

  constructor(private db:AngularFirestore) { }

  venue_array:any=[];
  venue_owner:any=[];
  email:any;
  v_email:any;

  ngOnInit() {
    this.loadAll();
  }

//get all vaneus 
  loadAll(){
    var _this=this;
    
//get all venue owners
    this.db.firestore.collection('register_user').get().then(docs=>{
      if(docs.empty) console.log("Empty Data");
      else{
        docs.forEach(doc=>{
          if(doc.data().role==="venue_owner"){                      
            _this.venue_owner.push(doc.data());
            _this.email=doc.data().email;

//get all halls using venue owner's email           
            this.db.firestore.collection(('register_user')).doc(_this.email).collection("venue").doc("hall").get().then(docs=>{
              if (!docs.exists) console.log("Empty Data"); 
              else{
                _this.venue_array.push(docs.data());
                _this.v_email=_this.email;
              }
              
            })
            
          }
        })
      }  
    })
    
  }

}
