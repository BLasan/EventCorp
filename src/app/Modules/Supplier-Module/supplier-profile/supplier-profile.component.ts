import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SupplierProfileService } from 'app/services/supplier-services.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import {image_uploader,remove_uploader} from '../../../../scripts/image_uploader'
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.scss']
})
export class SupplierProfileComponent implements OnInit {

  form: any;
  user_profile:any=[];
  user_events:any=[];
  username:string;
  image_file:FileList;
  isEmptyUserEvents:boolean=false;
  isUploading:boolean=false;
  isRemoved:boolean=false;
  constructor(private database:AngularFirestore,private storage:AngularFireStorage) { }
   
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
    let image_id="supplier-image/"+date;
    let storageRef=this.storage.ref(image_id);
    let _this=this;
    if(localStorage.getItem('user_name')==email){
      if(this.image_file){
        storageRef.put(_this.image_file[0]).then(function(snapshot){
          storageRef.getDownloadURL().subscribe(url=>{
             user_details={image_url:url,role:"supplier",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data};
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
        user_details={role:"supplier",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data,image_url:_this.user_profile[0].image_url};
        else if(this.isRemoved)
        user_details={role:"supplier",country:country,address:address,email:email,user_name:name,contact:contact,city:city,bio:bio_data,image_url:"assets/img/pro_img.png"};

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
