import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { ReactiveFormsModule } from "@angular/forms";
import * as firebase from "firebase";
import { tap, first } from 'rxjs/operators';
import { LoginService } from 'app/services/login.services';
import { VenueHomeService } from 'app/venue-module/venue-home/venue-home.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentsService } from 'app/services/comments.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ReportDialogComponent } from 'app/Modules/report-dialog/report-dialog.component';
import { UploadService } from '../services/upload.service';
import { Upload } from '../Modules/upload';


@Component({
  selector: "app-venue-profile",
  templateUrl: "./venue-profile.component.html",
  styleUrls: ["./venue-profile.component.scss"]
})

export class VenueProfileComponent implements OnInit {
  user: any;
  item: any;
  comments: any;
  result: any;

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(
    private db: AngularFirestore,
    private loginService: LoginService,
    private venueHomeService: VenueHomeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private upSvc: UploadService
  ) {
    // this.users = 
    console.log('Current User - ', loginService.currentUser())
    db.collection('register_user').doc(loginService.currentUser()).collection('venue').doc('hall').valueChanges()
      .pipe(first())
      .subscribe(snapshot => {
        console.log('snapshot - ', snapshot)
        this.user = snapshot
      });

  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
  }

  //   trackHero(index, comment) {
  //     console.log(comment.id);
  //     // return comment ? comment.id : undefined;

  // }

  openReportCommentsDialog(i) {
    // console.log("Comment ID - "+comment);
    const dialogConfig = new MatDialogConfig();
    // console.log("Real Comment iD - "+this.comments.uid);
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      idx: i,
      // title: 'Angular For Beginners'
    };

    this.dialog.open(ReportDialogComponent, dialogConfig);
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        console.log(this.item);
        // this.createForm();
      }
    });

    this.db.collection('Venues').doc(this.item.id).collection('comments').valueChanges()
      .subscribe(result => {
        this.comments = result;
        console.log('Comments - ', this.comments);
      })
  }
}
