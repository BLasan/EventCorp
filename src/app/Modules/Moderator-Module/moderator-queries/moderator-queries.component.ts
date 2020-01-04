import { Component, OnInit } from '@angular/core';
import { ModeratorService } from "../../../services/moderator.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-moderator-queries',
  templateUrl: './moderator-queries.component.html',
  styleUrls: ['./moderator-queries.component.scss']
})
export class ModeratorQueriesComponent implements OnInit {

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
    this.moderatorService.getQueries()
    .subscribe(result => {
      this.items = result;
      this.resultLength = result.length;
      console.log("\nresultLengeth - "+this.resultLength);
      // this.age_filtered_items = result;
      // this.name_filtered_items = result;
    })
  }

}
