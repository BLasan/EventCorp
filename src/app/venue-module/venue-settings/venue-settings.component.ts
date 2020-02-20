import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {confirmPassword} from '../../services/confirm-password.service'
import { MatDialogRef, MatDialog, _MatChipListMixinBase } from '@angular/material';
import {DeleteAccountService} from '../../services/account_delete.service';
import { LoginService } from 'app/services/login.services';
import {deactivate_searchBar} from '../../../scripts/search_bar_activate'
import { AngularFirestore } from '@angular/fire/firestore';
import { disable_visibility} from '../../../scripts/disable_a_href';
import { AngularFireAuth } from '@angular/fire/auth';
import CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venue-settings',
  templateUrl: './venue-settings.component.html',
  styleUrls: ['./venue-settings.component.scss']
})
export class VenueSettingsComponent implements OnInit {

  // public dialogRef: MatDialogRef<SettingsComponent>;
  // form:any;
  // user_email:string;
  // user_role:string;
  // del_status:any;
  // events_vis:boolean=true;
  // rating_vis:boolean=true;
  // about_vis:boolean=true;
  // contact_vis:boolean=true;
  // address_vis:boolean=true;
  // play_list_vis:boolean=true;
  // constructor(private database:AngularFirestore,private dialog:MatDialog,private _accountDel:DeleteAccountService,private _logout:LoginService,private auth:AngularFireAuth,private signout:LoginService,private router:Router) { }
constructor() {}
  ngOnInit() {
    deactivate_searchBar();
    // this.user_email=localStorage.getItem('user_name');
    // this.user_role=localStorage.getItem('role');
    // // this.load_view_settings();
    // this.form=new FormGroup({
    //   new_password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    //   re_enter_password:new FormControl('',[Validators.required,confirmPassword('new_password')])
    // });
  }

  // public hasError = (controlName: string, errorName: string) =>{
  //   return this.form.controls[controlName].hasError(errorName);
  // }

  // deleteAccount(){
  //   let user=localStorage.getItem('user_name');
  //   var delete_account=this.database.collection('register_user').doc(user).update({profile_status:'Deleted'});
  //   if(delete_account){
  //     alert("Deletion Success");
  //     this._logout.logOut();
  //   }
  //   else alert("Deletion Error");
  //   // this._accountDel.delete_account(user).subscribe(data=>{
  //   //   this.del_status=data;
  //   //   console.log(this.del_status.success);
  //   //   this._logout.logOut();
  //   // })
    
  // }

  // //resetting password
  // reset_password(){
  //   var _this=this;
  //   let password=this.form.controls['new_password'].value;
  //   var hash= CryptoJS.SHA256(password).toString();
  //   console.log(password);
  //   this.database.collection('register_user').doc(localStorage.getItem('user_name')).update({password:hash});
  //   console.log("AUTH->"+this.auth.auth.currentUser);
  //   this.auth.auth.currentUser.updatePassword(hash).then(()=>{
  //     _this.reset_form();
  //     _this.signout.logOut();
  //     _this.router.navigateByUrl('/login')
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // }


  // //reset the form
  // reset_form(){
  //   this.form.reset();
  // }

}
