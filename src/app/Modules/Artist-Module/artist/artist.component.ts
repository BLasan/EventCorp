import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import {image_uploader,remove_uploader} from '../../../../scripts/image_uploader'
import { ProfileService } from 'app/services/organizer_services.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
// import {getBioData,removeStorage,getAlbumData} from '../../../scripts/artist/artist_get_data';

// declare function removeStorage():any;

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})

export class ArtistComponent implements OnInit {
  
  form: any;
  user_profile:any=[];
  user_events:any=[];
  username:string;
  image_file:FileList;
  isEmptyUserEvents:boolean=false;

  constructor(private _organizer_services:ProfileService,private database:AngularFirestore,private storage:AngularFireStorage) { 
   
  }


  ngOnInit() {
   // deactivate_searchBar();
    this.loadUserProfile();
    this.loadUserEvents();
    this.username=localStorage.getItem('nameId');
    this.form=new FormGroup({
      f_name:new FormControl('',Validators.required),
      l_name:new FormControl('',[Validators.required]),
      address:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      country:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email,Validators.required]),
      contact:new FormControl('',[Validators.required]),
      about_me:new FormControl('',[])
      // password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    });  
  }

  onSubmit(){
    let contact=this.form.get('contact').value;
    let name=this.form.get('f_name').value+" "+this.form.get('l_name').value;
    let address=this.form.get('address').value;
    let country=this.form.get('country').value;
    let email=this.form.get('email').value;
    let city=this.form.get('city').value;
    let bio_data=this.form.get('about_me').value;
    let date=new Date().getTime().toString();
    let image_id="artist-image/"+date;
    let storageRef=this.storage.ref(image_id);
    let _this=this;
    if(localStorage.getItem('user_name')==email){
      if(this.image_file){
        storageRef.put(_this.image_file[0]).then(function(snapshot){
          storageRef.getDownloadURL().subscribe(url=>{
            var user_details={image_url:url,role:"artist",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data};
            _this.database.collection('register_user').doc(email).update(user_details); 
            remove_uploader();
            });
          });
      }
      else{
        var user_details={role:"artist",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data};
        this.database.collection('register_user').doc(email).update(user_details);
      }
    }
    else
    alert('Please provide your valid email');
    this.form.reset();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  get_uploaded_image(event){
    this.image_file=event.target.files;
    console.log(this.image_file)
  }

  reset_form(){
    (<HTMLInputElement>document.getElementById('email')).value="";
    (<HTMLInputElement>document.getElementById('f_name')).value="";
    (<HTMLInputElement>document.getElementById('l_name')).value="";
    (<HTMLInputElement>document.getElementById('address')).value="";
    (<HTMLInputElement>document.getElementById('country')).value="";
    (<HTMLInputElement>document.getElementById('city')).value="";
    (<HTMLInputElement>document.getElementById('about_me')).value="";
    (<HTMLInputElement>document.getElementById('contact')).value="";
    
  }

  upload_image(){
    image_uploader();
  }

  remove_image(){
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
    // this._organizer_services.loadEvents(user_name).subscribe((data)=>{
    //   this.user_events=data;
    //   if(!this.user_events) this.isEmptyUserEvents=true;
    //   console.log(this.user_events.data[0]+"=>EVENTS");
    //   });
  }

  loadUserProfile(){
    var _this=this;
    var docRef = this.database.firestore.collection('register_user').doc(localStorage.getItem("user_name"));
    docRef.get().then(function(doc) {
        console.log("UseData:"+doc.data().role)
        if(doc.data()){
            _this.user_profile.push(doc.data());
        }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

    // this._organizer_services.loadUserProfile(localStorage.getItem('user_name')).subscribe(data=>{
    //   this.user_profile=data;
    //   console.log(this.user_profile.data.email+"=>PROFILE")
    // })
  }
  

  }
  


