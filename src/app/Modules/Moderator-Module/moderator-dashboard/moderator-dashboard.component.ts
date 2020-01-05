import { Component, OnInit } from '@angular/core';
import { ModeratorService } from "../../../services/moderator.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router, Params } from '@angular/router';


@Component({
  selector: 'app-moderator-dashboard',
  templateUrl: './moderator-dashboard.component.html',
  styleUrls: ['./moderator-dashboard.component.scss']
})
export class ModeratorDashboardComponent implements OnInit {

  ageValue: number = 0;
  searchValue: string = "";
  // items: Array<any>;
  name_filtered_items: Array<any>;
  age_filtered_items: Array<any>;

  role: any;
  items: Array<any>;
  resultLength: number;

  constructor(
    private moderatorService: ModeratorService,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getData();
  }

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

  // searchByName() {
  //   let value = this.searchValue.toLowerCase();
  //   this.moderatorService.searchUsers(value).subscribe(result => {
  //     this.name_filtered_items = result;
  //     this.items = this.combineLists(result, this.age_filtered_items);
  //   });
  // }

  // combineLists(a, b) {
  //   let result = [];

  //   a.filter(x => {
  //     return b.filter(x2 => {
  //       if (x2.payload.doc.id == x.payload.doc.id) {
  //         result.push(x2);
  //       }
  //     });
  //   });
  //   return result;
  // }

  // rangeChange(event){
  //   this.venueHomeService.searchUsersByAge(event.value)
  //   .subscribe(result =>{
  //     this.age_filtered_items = result;
  //     this.items = this.combineLists(result, this.name_filtered_items);
  //   })
  // }

}
