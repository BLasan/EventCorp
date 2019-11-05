import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { ReactiveFormsModule } from "@angular/forms";
import * as firebase from "firebase";
import { tap, first } from 'rxjs/operators';
import { LoginService } from 'app/services/login.services';

@Component({
  selector: "app-venue-profile",
  templateUrl: "./venue-profile.component.html",
  styleUrls: ["./venue-profile.component.scss"]
})
export class VenueProfileComponent implements OnInit {
  user: any;

  constructor(
    private db: AngularFirestore,
    private loginService: LoginService
  ) {
    // this.users = 
    console.log(loginService.currentUser())
    db.collection('register_user').doc(loginService.currentUser()).collection('venue').doc('hall').valueChanges()
    .pipe(first())
    .subscribe( snapshot => {
      console.log(snapshot)
      this.user = snapshot
    });
    // var name, state, city, address, email;

    // if (user != null) {
    //   name = user.user_name;
    //   email = user.email;
    //   state = user.state;
    //   emailVerified = user.emailVerified;
    //   uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    //   // this value to authenticate with your backend server, if
    //   // you have one. Use User.getToken() instead.
    // }
  }

  ngOnInit() {}
}
