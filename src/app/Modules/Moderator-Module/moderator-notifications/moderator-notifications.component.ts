import { Component, OnInit } from '@angular/core';
import { ModeratorService } from "../../../services/moderator.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-moderator-notifications',
  templateUrl: './moderator-notifications.component.html',
  styleUrls: ['./moderator-notifications.component.scss']
})
export class ModeratorNotificationsComponent implements OnInit {

  items: Array<any>;
  resultLength: number;

  constructor(
    private moderatorService: ModeratorService,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.moderatorService.getReports()
    .subscribe(result => {
      this.items = result;
      this.resultLength = result.length;
      console.log("\nresultLengeth - "+this.resultLength);
      // this.age_filtered_items = result;
      // this.name_filtered_items = result;
    })
  }

}
