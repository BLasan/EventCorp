import { Component, OnInit ,OnDestroy} from '@angular/core';
import * as io from 'socket.io-client';
import { ProfileService } from 'app/services/organizer_services.service';
import { AdminService } from 'app/services/admin.service';
import { DeleteAccountService } from 'app/services/account_delete.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit{
  data:any=[];
  user_profile:any;
  success_message:any;
  constructor(private _loadUsers:AdminService,private _deleteAccount:DeleteAccountService,private _snackBar:MatSnackBar,private _recoverAccount:DeleteAccountService) {
    
   }

  ngOnInit() {
    this.getUsers();
  }

getUsers(){
    this._loadUsers.loadAllUsers().subscribe(data=>{
        this.user_profile=data;
    })
}

remove_user(email:string){
  this._deleteAccount.delete_account(email).subscribe(data=>{
    this.success_message=data;
    if(this.success_message.success){
      this._snackBar.open("Successfully Deleted","Done", {
        duration: 2000,
      });
      this.getUsers();
    }
  });
}

recover_user(email:string){
  this._recoverAccount.recover_account(email).subscribe(data=>{
    this.success_message=data;
    if(this.success_message){
      this._snackBar.open("Successfully Activated","Done", {
        duration: 2000,
      });
      this.getUsers();
    }
  })
}



}
