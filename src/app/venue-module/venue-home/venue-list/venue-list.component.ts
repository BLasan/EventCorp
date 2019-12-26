import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material";
import { VenueHomeService } from "../venue-home.service";
import { MatButtonModule } from "@angular/material/button";
import { AngularFirestore } from "@angular/fire/firestore";
import { LoginService } from "app/services/login.services";
import { Router, Params } from '@angular/router';
import * as firebase from "firebase";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

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
    // db.collection("Venues")
    //   .valueChanges()
    //   .subscribe(snapshot => {
    //     this.comments = snapshot;
    //     console.log(this.comments);
    //   });
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.venueHomeService.getUsers()
    .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  searchByName() {
    let value = this.searchValue.toLowerCase();
    this.venueHomeService.searchUsers(value).subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    });
  }

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

  rangeChange(event){
    this.venueHomeService.searchUsersByAge(event.value)
    .subscribe(result =>{
      this.age_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    })
  }

  // displayedColumns: string[] = ['Name', 'ac', 'car_parking', 'fee','seating_capacity'];
  // dataSource = new MatTableDataSource();

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  // @ViewChild(MatSort) sort: MatSort;

  // ngOnInit() {
  //   // Get all orders
  //   this.getAllOrders();
  // }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  // getAllOrders() {
  //   this.venueHomeService.getOrders().subscribe(res => {
  //     this.dataSource.data = res;
  //   });
  // }
}
