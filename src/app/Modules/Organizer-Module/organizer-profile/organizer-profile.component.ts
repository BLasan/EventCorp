import { Component, OnInit } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {image_uploader,remove_uploader} from '../../../../scripts/image_uploader';
import { SignupService } from 'app/services/signup.service';
import { MatSnackBar } from '@angular/material';
import { ProfileService } from 'app/services/organizer_services.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.scss']
})
export class OrganizerProfileComponent implements OnInit {
  form: any;
  user_name:string;
  my_bio:any;
  userbio:any;
  username:string;
  user_events:any=[];
  user_profile:any=[];
  image_file:any;
  isUploading:boolean=false;
  isRemoved:boolean=false;
  constructor(private _updateData:SignupService,private _snackbar:MatSnackBar,private _organizer_services:ProfileService,private database:AngularFirestore,private storage:AngularFireStorage) { }

  // ngOnInit() {
  //   deactivate_searchBar();
  //   //this.loadUserEvents();
  //   this.loadUserProfile();
  //   this.username=localStorage.getItem('nameId');
  // }

  // public hasError = (controlName: string, errorName: string) =>{
  //   return this.form.controls[controlName].hasError(errorName);
  // }

  // upload_image(){
  //   image_uploader();
  // }

  // remove_image(){
  //   remove_uploader();
  // }

  // // sendOrganizerDetails(){
  // //   let first_name= (<HTMLInputElement>document.getElementById('f_name')).value;
  // //   let last_name= (<HTMLInputElement>document.getElementById('l_name')).value;
  // //   let user_name=first_name+" "+last_name;
  // //   let email= (<HTMLInputElement>document.getElementById('email')).value;
  // //   let address1= (<HTMLInputElement>document.getElementById('address')).value;
  // //   let city= (<HTMLInputElement>document.getElementById('city')).value;
  // //   let state= (<HTMLInputElement>document.getElementById('state')).value;
  // //   let contact= (<HTMLInputElement>document.getElementById('contact')).value;
  // //   let bio=this.my_bio;
  // //   let user_details={user_name:user_name,email:email,address:address1,city:city,state:state,contact:contact,bio:bio};
  // //   this._updateData.updateData(user_details).subscribe(data=>{
  // //     let success_mesage:any=data;
  // //     if(success_mesage.success==true){
  // //       this.username=success_mesage.user_name;
  // //       this.userbio=success_mesage.bio;
  // //       this._snackbar.open("Successfully Updated","OK", {
  // //         duration: 3000,
  // //       });
  // //     }
  // //     else{
  // //       this._snackbar.open("Update Failed","OK", {
  // //         duration: 3000,
  // //       });
  // //     }
  // //   })
  // // }

  // loadUserEvents(){
  //   var _this=this;
  //   let user_name=localStorage.getItem("user_name");
  //   var docRef = this.database.firestore.collection('register_user').doc(user_name).collection('MyEvents');
  //   docRef.get().then(snapshot => {
  //     if (snapshot.empty) {
  //       console.log('No matching documents.');
  //     }  
  //     snapshot.forEach(doc => {
  //       console.log(doc.id, '=>', doc.data());
  //       _this.user_events.push(doc.data());
  //     });
  //     })
  //   .catch(err => {
  //     console.log('Error getting documents', err);
  //   });

  //   // let user_name=localStorage.getItem("user_name");
  //   // this._organizer_services.loadEvents(user_name).subscribe((data)=>{
  //   //   this.user_events=data;
  //   //   console.log(this.user_events.data[0]);
  //   //   });
  // }

  // loadUserProfile(){
  //   this.user_profile=[];
  //   var _this=this;
  //   var docRef = this.database.firestore.collection('register_user').doc(localStorage.getItem("user_name"));
  //   docRef.get().then(function(doc) {
  //       console.log("UseData:"+doc.data().role)
  //       if(doc.data()){
  //           _this.user_profile.push(doc.data());

  //           //get form controls
  //           _this.form=new FormGroup({
  //             user_name:new FormControl(doc.data().user_name,Validators.required),
  //             // l_name:new FormControl('',[Validators.required]),
  //             address:new FormControl(doc.data().address1+" "+doc.data().address2,Validators.required),
  //             city:new FormControl(doc.data().city,Validators.required),
  //             country:new FormControl('Sri Lanka',Validators.required),
  //             email:new FormControl({value:doc.data().email,disabled:true},[Validators.email,Validators.required]),
  //             contact:new FormControl(doc.data().contact,[Validators.required]),
  //             about_me:new FormControl(doc.data().bio,[])
  //             // password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  //           });
  //       }
  //   }).catch(function(error) {
  //     console.log("Error getting document:", error);
  //   });
  //   // this._organizer_services.loadUserProfile(localStorage.getItem('user_name')).subscribe(data=>{
  //   //   this.user_profile=data;
  //   //   console.log(this.user_profile.data.img_url)
  //   // })
  // }

  // onSubmit(){
  //   this.isUploading=true;
  //   let contact=this.form.get('contact').value;
  //   let name=this.form.get('user_name').value;
  //   let address=this.form.get('address').value;
  //   let country=this.form.get('country').value;
  //   let email=this.form.get('email').value;
  //   let city=this.form.get('city').value;
  //   let bio_data=this.form.get('about_me').value;
  //   let date=new Date().getTime().toString();
  //   let image_id="organizer-image/"+date;
  //   let storageRef=this.storage.ref(image_id);
  //   let _this=this;
  //   if(localStorage.getItem('user_name')==email){
  //     if(this.image_file){
  //       storageRef.put(_this.image_file[0]).then(function(snapshot){
  //         storageRef.getDownloadURL().subscribe(url=>{
  //           var user_details={image_url:url,role:"organizer",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data};
  //           _this.database.collection('register_user').doc(email).update(user_details).then(()=>{
  //             _this.isUploading=false;
  //             remove_uploader();
  //           }).catch(err=>{
  //             console.log(err);
  //             _this.isUploading=false;
  //           })
  //           });
  //         });
  //     }
  //     else{
  //       var user_details={role:"organizer",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data,image_url:_this.user_profile[0].image_url};
  //       this.database.collection('register_user').doc(email).update(user_details).then(()=>{
  //         _this.isUploading=false;
  //       }).catch(err=>{
  //         console.log(err);
  //         _this.isUploading=false;
  //       })
  //     }
  //   }
  //   else
  //   alert('Please provide your valid email');
  //   this.form.reset();
  //   //this.loadUserProfile();
  //   this.user_profile=[];
  //   this.user_profile.push(user_details);

  //    //get form controls
  //    _this.form=new FormGroup({
  //     user_name:new FormControl(user_details.user_name,Validators.required),
  //     address:new FormControl(user_details.address,Validators.required),
  //     city:new FormControl(user_details.city,Validators.required),
  //     country:new FormControl('Sri Lanka',Validators.required),
  //     email:new FormControl({value:user_details.email,disabled:true},[Validators.email,Validators.required]),
  //     contact:new FormControl(user_details.contact,[Validators.required]),
  //     about_me:new FormControl(user_details.bio,[])
  //   });
  // }

  // get_uploaded_image(event){
  //   this.image_file=event.target.files;
  //   console.log(this.image_file)
  // }

  // reset_form(){
  //   console.log("jdjdk");
  //   (<HTMLInputElement>document.getElementById('email')).value="";
  //   (<HTMLInputElement>document.getElementById('f_name')).value="";
  //   (<HTMLInputElement>document.getElementById('l_name')).value="";
  //   (<HTMLInputElement>document.getElementById('address')).value="";
  //   (<HTMLInputElement>document.getElementById('country')).value="";
  //   (<HTMLInputElement>document.getElementById('city')).value="";
  //   (<HTMLInputElement>document.getElementById('about_me')).value="";
  //   (<HTMLInputElement>document.getElementById('contact')).value="";
  // }


  ngOnInit() {
    deactivate_searchBar();
    //this.loadUserEvents();
    this.loadUserProfile();
    this.username=localStorage.getItem('nameId');
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  upload_image(){
    this.isRemoved=true;
    image_uploader();
  }

  remove_image(){
    this.isRemoved=true;
    remove_uploader();
  }


  loadUserEvents(){
    var _this=this;
    let user_name=localStorage.getItem("user_name");
    var docRef = this.database.firestore.collection('register_user').doc(user_name).collection('MyEvents');
    docRef.get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
      }  
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        _this.user_events.push(doc.data());
      });
      })
    .catch(err => {
      console.log('Error getting documents', err);
    });

    // let user_name=localStorage.getItem("user_name");
    // this._organizer_services.loadEvents(user_name).subscribe((data)=>{
    //   this.user_events=data;
    //   console.log(this.user_events.data[0]);
    //   });
  }

  loadUserProfile(){
    this.user_profile=[];
    var _this=this;
    var docRef = this.database.firestore.collection('register_user').doc(localStorage.getItem("user_name"));
    docRef.get().then(function(doc) {
        console.log("UseData:"+doc.data().role)
        if(doc.data()){
            _this.user_profile.push(doc.data());

            //get form controls
            _this.form=new FormGroup({
              user_name:new FormControl(doc.data().user_name,Validators.required),
              // l_name:new FormControl('',[Validators.required]),
              address:new FormControl(doc.data().address1+" "+doc.data().address2,Validators.required),
              city:new FormControl(doc.data().city,Validators.required),
              country:new FormControl('Sri Lanka',Validators.required),
              email:new FormControl({value:doc.data().email,disabled:true},[Validators.email,Validators.required]),
              contact:new FormControl(doc.data().contact,[Validators.required]),
              about_me:new FormControl(doc.data().bio,[])
              // password:new FormControl('',[Validators.required,Validators.minLength(6)]),
            });
        }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    // this._organizer_services.loadUserProfile(localStorage.getItem('user_name')).subscribe(data=>{
    //   this.user_profile=data;
    //   console.log(this.user_profile.data.img_url)
    // })
  }

  onSubmit(){
    this.isUploading=true;
    let user_details:any;
    let contact=this.form.get('contact').value;
    let name=this.form.get('user_name').value;
    let address=this.form.get('address').value;
    let country=this.form.get('country').value;
    let email=this.form.get('email').value;
    let city=this.form.get('city').value;
    let bio_data=this.form.get('about_me').value;
    let date=new Date().getTime().toString();
    let image_id="organizer-image/"+date;
    let storageRef=this.storage.ref(image_id);
    let _this=this;
    if(localStorage.getItem('user_name')==email){
      if(this.image_file){
        storageRef.put(_this.image_file[0]).then(function(snapshot){
          storageRef.getDownloadURL().subscribe(url=>{
             user_details={image_url:url,role:"organizer",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data};
            _this.database.collection('register_user').doc(email).update(user_details).then(()=>{
              _this.isUploading=false;
              _this.form.reset();
              //this.loadUserProfile();
              _this.user_profile=[];
              _this.user_profile.push(user_details);
          
               //get form controls
               _this.form=new FormGroup({
                user_name:new FormControl(user_details.user_name,Validators.required),
                address:new FormControl(user_details.address,Validators.required),
                city:new FormControl(user_details.city,Validators.required),
                country:new FormControl('Sri Lanka',Validators.required),
                email:new FormControl({value:user_details.email,disabled:true},[Validators.email,Validators.required]),
                contact:new FormControl(user_details.contact,[Validators.required]),
                about_me:new FormControl(user_details.bio,[])
              });
              remove_uploader();
            }).catch(err=>{
              console.log(err);
              _this.isUploading=false;
            })
            });
          });
      }
      else{
        
        //if image removed or not
        if(!this.isRemoved)
        user_details={role:"organizer",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data,image_url:_this.user_profile[0].image_url};
        else if(this.isRemoved)
        user_details={role:"organizer",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data,image_url:"assets/img/pro_img.png"};

        this.database.collection('register_user').doc(email).update(user_details).then(()=>{
          _this.isUploading=false;
          _this.form.reset();
          //this.loadUserProfile();
          _this.user_profile=[];
          _this.user_profile.push(user_details);
      
           //get form controls
           _this.form=new FormGroup({
            user_name:new FormControl(user_details.user_name,Validators.required),
            address:new FormControl(user_details.address,Validators.required),
            city:new FormControl(user_details.city,Validators.required),
            country:new FormControl('Sri Lanka',Validators.required),
            email:new FormControl({value:user_details.email,disabled:true},[Validators.email,Validators.required]),
            contact:new FormControl(user_details.contact,[Validators.required]),
            about_me:new FormControl(user_details.bio,[])
          });
        }).catch(err=>{
          console.log(err);
          _this.isUploading=false;
        })
      }
    }
    else
    alert('Please provide your valid email');
  }

  get_uploaded_image(event){
    this.image_file=event.target.files;
    console.log(this.image_file)
  }

  reset_form(){
    console.log("jdjdk");
    (<HTMLInputElement>document.getElementById('email')).value="";
    (<HTMLInputElement>document.getElementById('f_name')).value="";
    (<HTMLInputElement>document.getElementById('l_name')).value="";
    (<HTMLInputElement>document.getElementById('address')).value="";
    (<HTMLInputElement>document.getElementById('country')).value="";
    (<HTMLInputElement>document.getElementById('city')).value="";
    (<HTMLInputElement>document.getElementById('about_me')).value="";
    (<HTMLInputElement>document.getElementById('contact')).value="";
  }


}
