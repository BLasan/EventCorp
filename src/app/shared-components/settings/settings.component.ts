import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {confirmPassword} from '../../services/confirm-password.service'
import { MatDialogRef, MatDialog } from '@angular/material';
import {DeleteAccountService} from '../../services/account_delete.service';
import { LoginService } from 'app/services/login.services';
import {deactivate_searchBar} from '../../../scripts/search_bar_activate'
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public dialogRef: MatDialogRef<SettingsComponent>;
  form:any;
  user_email:string;
  user_role:string;
  del_status:any;
  constructor(private database:AngularFirestore,private dialog:MatDialog,private _accountDel:DeleteAccountService,private _logout:LoginService) { }

  ngOnInit() {
    deactivate_searchBar();
    this.user_email=localStorage.getItem('user_name');
    this.user_role=localStorage.getItem('role');
    this.form=new FormGroup({
      new_password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      re_enter_password:new FormControl('',[Validators.required,confirmPassword('new_password')])
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '500px',
      data: {name:'KL'}
    });

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  deleteAccount(){
    let user=localStorage.getItem('user_name');
    var delete_account=this.database.collection('register_user').doc(user).update({profile_status:'Deleted'});
    if(delete_account){
      alert("Deletion Success");
      this._logout.logOut();
    }
    else alert("Deletion Error");
    // this._accountDel.delete_account(user).subscribe(data=>{
    //   this.del_status=data;
    //   console.log(this.del_status.success);
    //   this._logout.logOut();
    // })
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
