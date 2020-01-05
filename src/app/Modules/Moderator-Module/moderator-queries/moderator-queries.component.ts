import { Component, OnInit } from '@angular/core';
import { ModeratorService } from "../../../services/moderator.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router, Params } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { QueryReplyDialogComponent } from '../query-reply-dialog/query-reply-dialog.component';
import { MatButtonModule } from "@angular/material/button";

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
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {                          //data which is going to passed into the QueryReplyDialogComponenet
      id: 1,
      title: 'Angular For Beginners'
  };

    this.dialog.open(QueryReplyDialogComponent, dialogConfig);
    
    const dialogRef = this.dialog.open(QueryReplyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("\nDialog output:", data)
    );    
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
