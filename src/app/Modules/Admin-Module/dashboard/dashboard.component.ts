import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {Chart} from 'chart.js';
import { AdminService } from 'app/services/admin.service';
import { get_realtime_data} from 'scripts/realtime_monitor';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  supplier_count:number=0;
  artist_count:number=0;
  venue_owner_count:number=0;
  organizer_count:number=0;
  artist_delete_count:number=0;
  organizer_delete_count:number=0;
  supplier_delete_count:number=0;
  venue_owner_delete_count:number=0;
  user_data:any;
  space_data:any;
  constructor(private _loadUsers:AdminService) { }
  PieChart:any;
  BarChart:any;
  BarChart1:any;
  
  ngOnInit() {

    //this.getUsers();
    get_realtime_data();
    //this.getSpaceUsage();
    this.PieChart=new Chart('piechart',{

      type: 'pie',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        //   scales: {
        //       yAxes: [{
        //           ticks: {
        //               beginAtZero: true
        //           }
        //       }]
        //   }
      }
    });
  }

  getUsers(){
      this._loadUsers.loadAllUsers().subscribe(data=>{
          this.user_data=data;
          console.log(this.user_data);
          this.artist_count=this.user_data.filter(x=> x.role=='artist' && x.profile_status=='Active').length;
          this.organizer_count=this.user_data.filter(x=> x.role=='organizer' && x.profile_status=='Active').length;
          this.supplier_count=this.user_data.filter(x=> x.role=='supplier' && x.profile_status=='Active').length;
          this.venue_owner_count=this.user_data.filter(x=> x.role=='venue_owner' && x.profile_status=='Active').length;
          this.artist_delete_count=this.user_data.filter(x=> x.profile_status=="Deleted" && x.role=='artist').length;
          this.organizer_delete_count=this.user_data.filter(x=> x.profile_status=="Deleted" && x.role=='organizer').length;
          this.supplier_delete_count=this.user_data.filter(x=> x.profile_status=="Deleted" && x.role=='supplier').length;
          this.venue_owner_delete_count=this.user_data.filter(x=> x.profile_status=="Deleted" && x.role=='venue_owner').length;
        //  this.createUserChart(this.artist_count,this.organizer_count,this.supplier_count,this.venue_owner_count);
         // this.createUserDeletionChart(this.artist_delete_count,this.organizer_delete_count,this.supplier_delete_count,this.venue_owner_delete_count);
      })
  }


  getSpaceUsage(){
      this._loadUsers.getUserSpace().subscribe(data=>{
          this.space_data=data;
          if(this.space_data.success){
              console.log(this.space_data.size);
          }
      })
  }



//   createUserChart(artist_count,organizer_count,supplier_count,venue_owner_count){
//     this.BarChart=new Chart('barchart',{
//         type: 'bar',
//         data: {
//             labels: ['Organizer', 'Artist', 'Supplier', 'Venue-Owner'],
//             datasets: [{
//                 label: 'No of Users',
//                 data: [organizer_count,artist_count,supplier_count,venue_owner_count],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(11, 156, 49,1)',
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                 ],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });
//   }

//   createUserDeletionChart(artist,organizer,supplier,venue_owner){
//     this.BarChart1=new Chart('barchart1',{
//         type: 'bar',
//         data: {
//             labels: ['Organizer', 'Supplier', 'Venue-Owner', 'Artist'],
//             datasets: [{
//                 label: 'No of User Deletions',
//                 data: [organizer,supplier,venue_owner,artist],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });
//   }
}
