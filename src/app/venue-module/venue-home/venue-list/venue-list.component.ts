import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material";
import { VenueHomeService } from "../venue-home.service";
import { MatButtonModule } from "@angular/material/button";
import { AngularFirestore } from "@angular/fire/firestore";
import { LoginService } from "app/services/login.services";
import { Router, Params } from '@angular/router';
import * as firebase from "firebase";


@Component({
  selector: "app-venue-list",
  templateUrl: "./venue-list.component.html",
  styleUrls: ["./venue-list.component.scss"]
})
export class VenueListComponent implements OnInit {
  
  comments;

  ageValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  name_filtered_items: Array<any>;
  age_filtered_items: Array<any>;

  constructor(
    private venueHomeService: VenueHomeService,
    private db: AngularFirestore,
    private router: Router

  ) {
    
  }

  ngOnInit() {
    this.getData();
  }

  //getting data
  getData(){
    this.venueHomeService.getUsers()
    .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

  //directing to the profile of each venue tile
  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  //filtering out venues by name
  searchByName() {
    let value = this.searchValue.toLowerCase();
    this.venueHomeService.searchUsers(value).subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    });
  }

  //combining the list of both filters
  combineLists(a, b) {
    let result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id == x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }

  //filtering by seating capacity
  rangeChange(event){
    this.venueHomeService.searchUsersByAge(event.value)
    .subscribe(result =>{
      this.age_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    })
  }
}
