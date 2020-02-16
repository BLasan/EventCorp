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
  events_vis:boolean=true;
  rating_vis:boolean=true;
  about_vis:boolean=true;
  contact_vis:boolean=true;
  address_vis:boolean=true;
  play_list_vis:boolean=true;
  constructor(private database:AngularFirestore,private dialog:MatDialog,private _accountDel:DeleteAccountService,private _logout:LoginService,private auth:AngularFireAuth,private signout:LoginService,private router:Router) { }

  ngOnInit() {
    //disable_visibility()
    deactivate_searchBar();
    this.user_email=localStorage.getItem('user_name');
    this.user_role=localStorage.getItem('role');
    this.load_view_settings();
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

  //check validation errors
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }


  //delete account
  deleteAccount(){
    var _this=this;
    if(confirm('Are You Sure?')){
      let user=localStorage.getItem('user_name');
      var delete_account=this.database.collection('register_user').doc(user).update({profile_status:'Deleted'});
      if(delete_account){
        alert("Deletion Success");
        _this.logout_User();
      }
      else alert("Deletion Error");
    }
    else{
      alert("Deletion Cancelled!");
    }
    
  }

  logout_User(){  
    var _this=this;
    var user=localStorage.getItem('user_name');
    console.log(user);
    var _auth=this.auth.auth;
    var _home=document.getElementById('logout_route');
 
    this.database.firestore.collection('register_user').doc(user).update({active_status:'logout'}).then(()=>{
        _auth.signOut();
        _home.click();
    }).catch(err=>{
        console.log(err);
    });

    //remove localstorage items
    localStorage.removeItem('user_name');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('nameId');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('searched_user_email');
    localStorage.removeItem('status');
    localStorage.removeItem('isBookingReq');
}

  onNoClick(): void {
    this.dialogRef.close();
  }


  //change the visibility of data
  changeView(type:any){

    disable_visibility();
    var _this=this;
    if(this.user_role==='organizer'){
      if(type==='contact')
      this.database.firestore.collection('visibility').doc(this.user_email).update({contact:false}).then(doc=>{
        _this.contact_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='address')
      this.database.firestore.collection('visibility').doc(this.user_email).update({address:false}).then(doc=>{
        _this.address_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='about')
      this.database.firestore.collection('visibility').doc(this.user_email).update({about:false}).then(doc=>{
        _this.about_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='rating')
      this.database.firestore.collection('visibility').doc(this.user_email).update({rating:false}).then(doc=>{
        _this.rating_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='events')
      this.database.firestore.collection('visibility').doc(this.user_email).update({events:false}).then(doc=>{
        _this.events_vis=false
      }).catch(err=>{
        console.log(err);
      });
    }

    else if(this.user_role==='artist'){
      if(type==='contact')
      this.database.firestore.collection('visibility').doc(this.user_email).update({contact:false}).then(doc=>{
        _this.contact_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='address')
      this.database.firestore.collection('visibility').doc(this.user_email).update({address:false}).then(doc=>{
        _this.address_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='about')
      this.database.firestore.collection('visibility').doc(this.user_email).update({about:false}).then(doc=>{
        _this.about_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='events')
      this.database.firestore.collection('visibility').doc(this.user_email).update({events:false}).then(doc=>{
        _this.events_vis=false
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='playlist')
      this.database.firestore.collection('visibility').doc(this.user_email).update({playlist:false}).then(doc=>{
        _this.play_list_vis=false;
      }).catch(err=>{
  
      });
    }

    else if(this.user_role==='venue_owner'){
      if(type==='contact')
      this.database.firestore.collection('visibility').doc(this.user_email).update({contact:false}).then(doc=>{
        _this.contact_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='address')
      this.database.firestore.collection('visibility').doc(this.user_email).update({address:false}).then(doc=>{
        _this.address_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='about')
      this.database.firestore.collection('visibility').doc(this.user_email).update({about:false}).then(doc=>{
        _this.about_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='rating')
      this.database.firestore.collection('visibility').doc(this.user_email).update({rating:false}).then(doc=>{
        _this.rating_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='events')
      this.database.firestore.collection('visibility').doc(this.user_email).update({events:false}).then(doc=>{
        _this.events_vis=false
      }).catch(err=>{
        console.log(err);
      });
    }

    else if(this.user_role==='supplier'){
      if(type==='contact')
      this.database.firestore.collection('visibility').doc(this.user_email).update({contact:false}).then(doc=>{
        _this.contact_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='address')
      this.database.firestore.collection('visibility').doc(this.user_email).update({address:false}).then(doc=>{
        _this.address_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='about')
      this.database.firestore.collection('visibility').doc(this.user_email).update({about:false}).then(doc=>{
        _this.about_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='rating')
      this.database.firestore.collection('visibility').doc(this.user_email).update({rating:false}).then(doc=>{
        _this.rating_vis=false;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='events')
      this.database.firestore.collection('visibility').doc(this.user_email).update({events:false}).then(doc=>{
        _this.events_vis=false
      }).catch(err=>{
        console.log(err);
      });
    }
  }


  //recover to previous
  refresh(type:any){
    disable_visibility();
    var _this=this;
    if(this.user_role==='organizer'){
      if(type==='contact')
      this.database.firestore.collection('visibility').doc(this.user_email).update({contact:true}).then(doc=>{
        _this.contact_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='address')
      this.database.firestore.collection('visibility').doc(this.user_email).update({address:true}).then(doc=>{
        _this.address_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='about')
      this.database.firestore.collection('visibility').doc(this.user_email).update({about:true}).then(doc=>{
        _this.about_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='rating')
      this.database.firestore.collection('visibility').doc(this.user_email).update({rating:true}).then(doc=>{
        _this.rating_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='events')
      this.database.firestore.collection('visibility').doc(this.user_email).update({events:true}).then(doc=>{
        _this.events_vis=true;
      }).catch(err=>{
        console.log(err);
      });
    }

    else if(this.user_role==='artist'){
      if(type==='contact')
      this.database.firestore.collection('visibility').doc(this.user_email).update({contact:true}).then(doc=>{
        _this.contact_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='address')
      this.database.firestore.collection('visibility').doc(this.user_email).update({address:true}).then(doc=>{
        _this.address_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='about')
      this.database.firestore.collection('visibility').doc(this.user_email).update({about:true}).then(doc=>{
        _this.about_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='events')
      this.database.firestore.collection('visibility').doc(this.user_email).update({events:true}).then(doc=>{
        _this.events_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='playlist')
      this.database.firestore.collection('visibility').doc(this.user_email).update({playlist:true}).then(doc=>{

      }).catch(err=>{
  
      });
    }

    else if(this.user_role==='venue_owner'){
      if(type==='contact')
      this.database.firestore.collection('visibility').doc(this.user_email).update({contact:true}).then(doc=>{
        _this.contact_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='address')
      this.database.firestore.collection('visibility').doc(this.user_email).update({address:true}).then(doc=>{
        _this.address_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='about')
      this.database.firestore.collection('visibility').doc(this.user_email).update({about:true}).then(doc=>{
        _this.about_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='rating')
      this.database.firestore.collection('visibility').doc(this.user_email).update({rating:true}).then(doc=>{
        _this.rating_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='events')
      this.database.firestore.collection('visibility').doc(this.user_email).update({events:true}).then(doc=>{
        _this.events_vis=true;
      }).catch(err=>{
        console.log(err);
      });
    }

    else if(this.user_role==='supplier'){
      if(type==='contact')
      this.database.firestore.collection('visibility').doc(this.user_email).update({contact:true}).then(doc=>{
        _this.contact_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='address')
      this.database.firestore.collection('visibility').doc(this.user_email).update({address:true}).then(doc=>{
        _this.address_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='about')
      this.database.firestore.collection('visibility').doc(this.user_email).update({about:true}).then(doc=>{
        _this.about_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='rating')
      this.database.firestore.collection('visibility').doc(this.user_email).update({rating:true}).then(doc=>{
        _this.rating_vis=true;
      }).catch(err=>{
        console.log(err);
      });
      else if(type==='events')
      this.database.firestore.collection('visibility').doc(this.user_email).update({events:true}).then(doc=>{
        _this.events_vis=true;
      }).catch(err=>{
        console.log(err);
      });
    }
  }


  //load view settings
  load_view_settings(){
    var _this=this;
    this.database.firestore.collection('visibility').doc(this.user_email).get().then(doc=>{
      if(!doc.data()) console.log("Empty Data");
      else{
        if(doc.data().events===false) _this.events_vis=false;
        if(doc.data().about===false) _this.about_vis=false;
        if(doc.data().contact===false) _this.contact_vis=false;
        if(doc.data().address===false) _this.address_vis=false;
        if(doc.data().playlist===false && _this.user_role==='artist') _this.play_list_vis=false;
        if(doc.data().rating===false && _this.user_role!='artist') _this.rating_vis=false;
      }
    });
  }


  //resetting password
  reset_password(){
    var _this=this;
    let password=this.form.controls['new_password'].value;
    var hash= CryptoJS.SHA256(password).toString();
    console.log(password);

    //update the active status
    this.auth.auth.onAuthStateChanged((user)=>{
      if(user){
        user.updatePassword(hash).then(()=>{
          this.database.collection('register_user').doc(localStorage.getItem('user_name')).update({password:hash,active_status:'logout'}).then(()=>{
            _this.reset_form();
            _this.signout.logOut();
            _this.router.navigateByUrl('/login');

          }).catch(ex=>{
            console.log(ex);
          });

        }).catch(err=>{
          console.log(err);
          if(confirm("You need to login again in order to proceed the action....")){
            _this.router.navigateByUrl('/login');
          }
        });
      }
    })
  }


  //reset the form
  reset_form(){
    this.form.reset();
  }



}
