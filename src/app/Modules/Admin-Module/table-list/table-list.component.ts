import { Component, OnInit ,OnDestroy} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import CryptoJS from 'crypto-js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit{
  data:any=[];
  form:any;
  user_profile:any=[];
  success_message:any;
  isEmpty:boolean=false;
  isLoading:boolean=true;
  testVal:boolean=false;
  selection:any="All Users";
  filtered_users:any;
  isModalOpen:boolean=false;
  roles:any=[{value:'organizer',role:'Organizer'},{value:'artist',role:'Artist'},{value:'supplier',role:'Supplier'},{value:'venue_owner',role:'Venue-Owner'}];
  constructor(private _snackBar:MatSnackBar,private database:AngularFirestore) {
    
   }

  ngOnInit() {
    this.getUsers();
    //document.getElementById('search_bar').style.display="none";
  }

  public hasError = (controlName: string, errorName: string) =>{
    
    return this.form.controls[controlName].hasError(errorName);
  }


//get all users
getUsers(){
  var _this=this;
  this.user_profile=[];
  this.isLoading=true;
  var docRef = this.database.firestore.collection('register_user');
  docRef.get()
  .then(snapshot => {
  if (snapshot.empty) {
    console.log('No matching documents.');
  }  

  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data().role);
    if(doc.data().role!=='moderator' && doc.data().role!=='admin')
    _this.user_profile.push(doc.data());
    _this.filtered_users=_this.user_profile;
    _this.isLoading=false;
  });

  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}


//filter roles
filterRoles(event:any){
  var _this=this;
  this.filtered_users=[];
  var val=event.value;
  if(val!=="all")
  this.filtered_users=this.user_profile.filter(x=>x.role===val);
  else
  this.getUsers();
  this.testVal=true;
}

//remove the user
remove_user(email:string){
  if(confirm("Are You Sure?")){
    var delete_account=this.database.collection('register_user').doc(email).update({profile_status:'Deleted'});
    if(delete_account){
      this._snackBar.open("Successfully Deleted","Done", {
        duration: 2000,
      });
      this.getUsers();
    }
  }
 
  else{
    alert("Deletion Cancelled!");
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


//send message
sendMessage(){
  var _this=this;
  let email=this.form.get('user_email').value;
  let message=this.form.get('message').value;
  let id=email+"@"+new Date();
  let btn_id=document.getElementById('close_btn');
  id=CryptoJS.SHA256(id).toString();
  let message_obj={sender_name:"Admin",date:new Date(),message:message,id:id,view:false};
  this.database.collection('register_user').doc(email).collection('notification-messages').doc(id).set(message_obj).then(()=>{
    console.log("Success");
    btn_id.click();
    _this.isModalOpen=false;
  }).catch(err=>{
    console.log(err);
  })
}

//recover account status
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


//open modal
openModal(email){
  this.isModalOpen=true;
  this.form=new FormGroup({
    user_email:new FormControl({value:email,disabled:true},[Validators.required,Validators.email]),
    message:new FormControl('',Validators.required)
  });
}



}