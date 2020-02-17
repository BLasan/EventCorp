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
import {MatDialog, MatDialogConfig} from "@angular/material";
import { ReportDialogComponent } from 'app/Modules/report-dialog/report-dialog.component';

@Component({
  selector: 'app-venue-owner-profile',
  templateUrl: './venue-owner-profile.component.html',
  styleUrls: ['./venue-owner-profile.component.scss']
})
export class VenueOwnerProfileComponent implements OnInit {

  user: any;
  item: any;
  comments: any;
  result: any;

  constructor(
    private db: AngularFirestore,
    private loginService: LoginService,
    private venueHomeService: VenueHomeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    // console.log('Current User - ',loginService.currentUser())
    // db.collection('register_user').doc(loginService.currentUser()).collection('venue').doc('hall').valueChanges()
    // .pipe(first())
    // .subscribe( snapshot => {
    //   console.log('snapshot - ',snapshot)
    //   this.user = snapshot
    // });
   }

   ngOnInit() {
    // this.route.data.subscribe(routeData => {
    //   let data = routeData['data'];
    //   if (data) {
    //     this.item = data.payload.data();
    //     this.item.id = data.payload.id;
    //     console.log(this.item);
    //     // this.createForm();
    //   }
    // });

    this.db.collection('register_user').doc(this.loginService.currentUser()).collection('venue').doc('hall').valueChanges()
    .pipe(first())
    .subscribe( snapshot => {
      console.log('snapshot - ',snapshot)
      this.user = snapshot
    });

    this.db.collection('register_user').doc(this.loginService.currentUser()).collection('comments').valueChanges()
    .subscribe(result => {
      this.comments = result;
      console.log('Comments - ',this.comments);
    })
  }

}
