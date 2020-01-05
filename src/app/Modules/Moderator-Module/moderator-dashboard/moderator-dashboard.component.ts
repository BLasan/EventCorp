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
  // items: Array<any>;
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
    // this.getData();
    // this.form=new FormGroup({
    //   filter_role:new FormControl('',[])
    // })
    this.getUsers();
  }

  // ngAfterViewInit(){
  //   this.roleSelect.valueChange.subscribe(val=>{
  //     console.log(val)
  //   })
  // }

  getArtistData(){
    this.role = "artist";
    this.moderatorService.getArtists()
    .subscribe(result => {
      this.items = result;
      this.resultLength = result.length;
      console.log("\nresultLengeth - "+this.resultLength);
      console.log("\nresult - "+this.items);
      // this.age_filtered_items = result;
      // this.name_filtered_items = result;
    })
  }

  getVenueData(){
    this.role = "venue";
    this.moderatorService.getVenues()
    .subscribe(result => {
      this.items = result;
      this.resultLength = result.length;
      console.log("\nresultLengeth - "+this.resultLength);
      console.log("\nresult - "+this.items);
      // this.age_filtered_items = result;
      // this.name_filtered_items = result;
    })
  }

  getOrganizerData(){
    this.role = "organizer";
    this.moderatorService.getOrganizers()
    .subscribe(result => {
      this.items = result;
      this.resultLength = result.length;
      console.log("\nresultLengeth - "+this.resultLength);
      console.log("\nresult - "+this.items);
      // this.age_filtered_items = result;
      // this.name_filtered_items = result;
    })
  }

  getSupplierData(){
    this.role = "supplier";
    this.moderatorService.getSuppliers()
    .subscribe(result => {
      this.items = result;
      this.resultLength = result.length;
      console.log("\nresultLengeth - "+this.resultLength);
      console.log("\nresult - "+this.items);
      // this.age_filtered_items = result;
      // this.name_filtered_items = result;
    })
  }

  myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementById('searchByText');
    console.log("ul - "+ul + " li - "+li);
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
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
