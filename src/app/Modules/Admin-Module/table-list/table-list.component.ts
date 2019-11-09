import { Component, OnInit ,OnDestroy} from '@angular/core';
import * as io from 'socket.io-client';
import { ProfileService } from 'app/services/organizer_services.service';
import { AdminService } from 'app/services/admin.service';
import { DeleteAccountService } from 'app/services/account_delete.service';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit{
  data:any=[];
  user_profile:any=[];
  success_message:any;
  constructor(private _loadUsers:AdminService,private _deleteAccount:DeleteAccountService,private _snackBar:MatSnackBar,private _recoverAccount:DeleteAccountService,private database:AngularFirestore) {
    
   }

  ngOnInit() {
    this.getUsers();
  }

getUsers(){
  var _this=this;
  var docRef = this.database.firestore.collection('register_user');
  docRef.get()
  .then(snapshot => {
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  

  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    _this.user_profile.push(doc.data());
  });

  })
.catch(err => {
  console.log('Error getting documents', err);
});
    // this._loadUsers.loadAllUsers().subscribe(data=>{
    //     this.user_profile=data;
    // })
}

remove_user(email:string){
  var delete_account=this.database.collection('register_user').doc(email).update({profile_status:'Deleted'});
  if(delete_account){
    this._snackBar.open("Successfully Deleted","Done", {
      duration: 2000,
    });
    this.getUsers();
  }
  // this._deleteAccount.delete_account(email).subscribe(data=>{
  //   this.success_message=data;
  //   if(this.success_message.success){
  //     this._snackBar.open("Successfully Deleted","Done", {
  //       duration: 2000,
  //     });
  //     this.getUsers();
  //   }
  // });
}

recover_user(email:string){
  var recover_account=this.database.collection('register_user').doc(email).update({profile_status:'Active'});
  if(recover_account){
    this._snackBar.open("Successfully Activated","Done", {
      duration: 2000,
    });
    this.getUsers();
  }
  // this._recoverAccount.recover_account(email).subscribe(data=>{
  //   this.success_message=data;
  //   if(this.success_message){
  //     this._snackBar.open("Successfully Activated","Done", {
  //       duration: 2000,
  //     });
  //     this.getUsers();
  //   }
  // })
}



}
