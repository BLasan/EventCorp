import { Component, OnInit, ViewChild } from '@angular/core';
import { ModeratorService } from "../../../services/moderator.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';


@Component({
  selector: 'app-moderator-dashboard',
  templateUrl: './moderator-dashboard.component.html',
  styleUrls: ['./moderator-dashboard.component.scss']
})
export class ModeratorDashboardComponent implements OnInit {
  @ViewChild('roleSelect') roleSelect:MatSelect;
  ageValue: number = 0;
  searchValue: string = "";
  name_filtered_items: Array<any>;
  age_filtered_items: Array<any>;
  user_profile:any=[];
  role: any;
  items: Array<any>;
  resultLength: number;
  selection:string="All";
  isLoaded:boolean=false;
  form:any;
  constructor(
    private moderatorService: ModeratorService,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {    
    this.getUsers();
  }

  activateUser(userId){
    console.log("going to deactive this guy - ", userId);
    this.db.collection('register_user').doc(userId).update({profile_status:'Active'});
  }

  deactivateUser(userId){
    console.log("going to deactive this guy - ", userId);
    this.db.collection('register_user').doc(userId).update({profile_status:'Deleted'});
  }

  getUsers(){
    var _this=this;
    var docRef = this.db.firestore.collection('register_user');
    docRef.get()
    .then(snapshot => {
      _this.isLoaded=true;
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
  
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      _this.user_profile.push(doc.data());
    });
  
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  }

  filterUser(event:any){
    var _this=this;
    this.isLoaded=false;
    this.user_profile=[];
    if(event.value=="supplier"){
      this.selection="Supplier";
      this.db.firestore.collection('register_user').get().then(docs=>{
        _this.isLoaded=true;
        if(docs.empty){
          console.log("Empty");
        }
        else{
          docs.forEach(doc=>{
            if(doc.data().role==='supplier'){
              _this.user_profile.push(doc.data());
            }
          })
        }
      })
    }
    else if(event.value=="artist"){
      this.selection="Artist";
      this.db.firestore.collection('register_user').get().then(docs=>{
        _this.isLoaded=true;
        if(docs.empty){
          console.log("Empty");
        }
        else{
          docs.forEach(doc=>{
            if(doc.data().role==='artist'){
              _this.user_profile.push(doc.data());
            }
          })
        }
      })
    }
    else if(event.value=="venue_owner"){
      this.selection="Venue Owner";
      this.db.firestore.collection('register_user').get().then(docs=>{
        _this.isLoaded=true;
        if(docs.empty){
          console.log("Empty");
        }
        else{
          docs.forEach(doc=>{
            if(doc.data().role==='venue_owner'){
              _this.user_profile.push(doc.data());
            }
          })
        }
      })
    }
    else if(event.value=="organizer"){
      this.selection="Organizer";
      this.db.firestore.collection('register_user').get().then(docs=>{
        _this.isLoaded=true;
        if(docs.empty){
          console.log("Empty");
        }
        else{
          docs.forEach(doc=>{
            if(doc.data().role==='organizer'){
              _this.user_profile.push(doc.data());
            }
          })
        }
      })
    }
    else if(event.value=="all"){
      this.selection="All"
      this.db.firestore.collection('register_user').get().then(docs=>{
        _this.isLoaded=true;
        if(docs.empty){
          console.log("Empty");
        }
        else{
          docs.forEach(doc=>{
            _this.user_profile.push(doc.data());
          })
        }
      })
    }
  }

}
