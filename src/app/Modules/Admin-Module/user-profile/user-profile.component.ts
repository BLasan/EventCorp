import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ProfileService } from 'app/services/organizer_services.service';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {image_uploader,remove_uploader} from '../../../../scripts/image_uploader';
import { AngularFireStorage } from '@angular/fire/storage';
import { LIVE_ANNOUNCER_ELEMENT_TOKEN } from '@angular/cdk/a11y';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  form: any;
  user_profile:any=[];
  user_events:any;
  username:string;
  image_file:FileList;
  constructor(private _organizer_services:ProfileService,private database:AngularFirestore,private storage:AngularFireStorage) { 
   
  }

  ngOnInit() {
    deactivate_searchBar();
    this.loadUserProfile();
    this.form=new FormGroup({
      user_name:new FormControl('',Validators.required),
      contact:new FormControl('',Validators.required),
      f_name:new FormControl('',Validators.required),
      l_name:new FormControl('',[Validators.required]),
      address:new FormControl('',Validators.required),
      country:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email,Validators.required]),
      postal_code:new FormControl('',[]),
      bio_data:new FormControl('',[]),
      // image:new FormControl('',[])
      // password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    });  
  }

  onSubmit(){
    let user_name=this.form.get('user_name').value;
    let contact=this.form.get('contact').value;
    let name=this.form.get('f_name').value+" "+this.form.get('l_name').value;
    let address=this.form.get('address').value;
    let country=this.form.get('country').value;
    let email=this.form.get('email').value;
    let postal_code=this.form.get('postal_code').value;
    let bio_data=this.form.get('bio_data').value;
    let date=new Date().getTime().toString();
    let image_id="admin-image/"+date;
    let storageRef=this.storage.ref(image_id);
    let _this=this;
    if(localStorage.getItem('user_name')==email){
      if(this.image_file){
        storageRef.put(_this.image_file[0]).then(function(snapshot){
          storageRef.getDownloadURL().subscribe(url=>{
            var user_details={image_url:url,role:"admin",country:country,address:address,email:email,user_name:name,screen_name:user_name,contact:contact,p_code:postal_code,bio:bio_data};
            _this.database.collection('register_user').doc(email).update(user_details); 
            remove_uploader();
            _this.reset_form();
            });
          });
      }
      else{
        var user_details={role:"admin",country:country,address:address,email:email,user_name:name,screen_name:user_name,contact:contact,p_code:postal_code,bio:bio_data};
        this.database.collection('register_user').doc(email).update(user_details);
        this.form.reset();
      }
    }
    else
    alert('Please provide your valid email');
    console.log(user_name)
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  get_uploaded_image(event){
    this.image_file=event.target.files;
    console.log(this.image_file)
  }

  upload_image(){
    image_uploader();
  }

  remove_image(){
    remove_uploader();
  }

  loadUserProfile(){
    var _this=this;
    var docRef = this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name'));
    docRef.get().then(function(doc) {
        console.log("UseData:"+doc.data().role)
        if(doc.data()){
            _this.user_profile.push(doc.data());
            _this.username=doc.data().user_name;
        }

        else{
            console.log("No data");
        }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    // this._organizer_services.loadUserProfile(localStorage.getItem('user_name')).subscribe(data=>{
    //   this.user_profile=data;
    //   this.username=this.user_profile.user_name;
    //   console.log(this.user_profile.data.email+"=>PROFILE")
    // })
  }

  reset_form(){
    (<HTMLInputElement>document.getElementById('user_name')).value="";
    (<HTMLInputElement>document.getElementById('email')).value="";
    (<HTMLInputElement>document.getElementById('f_name')).value="";
    (<HTMLInputElement>document.getElementById('l_name')).value="";
    (<HTMLInputElement>document.getElementById('address')).value="";
    (<HTMLInputElement>document.getElementById('country')).value="";
    (<HTMLInputElement>document.getElementById('p_code')).value="";
    (<HTMLInputElement>document.getElementById('bio')).value="";
    (<HTMLInputElement>document.getElementById('contact')).value=""
  }


  


}
