import { Component, OnInit } from '@angular/core';
import {disable_playlist_uploader,disable_remove_files} from '../../../../scripts/disable_a_href';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import CryptoJS from 'crypto-js';
@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.scss']
})
export class AddPlaylistComponent implements OnInit {

  audio_files:FileList;
  total_size:number=0;
  form:any;
  isUploading:boolean=false;
  audio_url:Array<{url:string,name:string,size:any}>=[];
  refUrlArray:any=[];
  constructor(private database:AngularFirestore,private storage:AngularFireStorage) { }

  ngOnInit() {
    this.form=new FormGroup({
      playlist_name:new FormControl('',[Validators.required]),
      playlist_description:new FormControl('',[Validators.required])
    });

    //disable_playlist_uploader();
  }

  upload_files(event){
    event.preventDefault();
    document.getElementById('playlist_uploader').click();
    // disable_playlist_uploader();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  audio_upload(event){
    this.total_size=0;
    this.audio_files=event.target.files;
    console.log(event.target.files[0].size);
    (<HTMLInputElement>document.getElementById('progress_bar')).removeAttribute('style');
    for(var i=0;i<this.audio_files.length;i++)
    this.total_size+=event.target.files[i].size;
  
    //remove progress bar after uploading
    if(i===this.audio_files.length){
      (<HTMLInputElement>document.getElementById('remove_file')).removeAttribute('style');
      (<HTMLInputElement>document.getElementById('progress_bar')).style.display="none";
    }
    
    //calculate the size of the files
    this.total_size=(this.total_size)/(1024*1024);   
    (<HTMLInputElement>document.getElementById('size')).innerHTML=this.total_size.toFixed(2).toString()+"MB";
  }


  remove(){
    disable_remove_files();
    (<HTMLInputElement>document.getElementById('remove_file')).style.display="none";
    (<HTMLInputElement>document.getElementById('playlist_uploader')).value="";
    (<HTMLInputElement>document.getElementById('size')).innerHTML="Size: 0MB";
    this.audio_url=[];
  }

  onSubmit(){
   this.isUploading=true;
   var _this=this;
   let name=(<HTMLInputElement>document.getElementById('playlist_name')).value;
   let description=(<HTMLInputElement>document.getElementById('description')).value;
   let today=new Date();
   let date=today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
  
  //remove files from the storage
  try{
    for(var i=0;i<50;i++){
      var audio_id="artist-playlist/"+localStorage.getItem('user_name')+"/"+"audio"+i;
    }
  }catch(ex){
    console.log(ex);
  }
  var audio_id="artist-playlist/"+localStorage.getItem('user_name')+"/";
  this.storage.ref(audio_id).delete().forEach(()=>{

  }).catch(err=>{
    console.log(err)
  })
  //upload files 
  for(var i=0;i<this.audio_files.length;i++){
    var audio_id="artist-playlist/"+localStorage.getItem('user_name')+"/"+"audio"+i;
    var storageRef=this.storage.ref(audio_id);
    var storageRef1=this.storage.ref(audio_id);
    storageRef.put(this.audio_files.item(i)).then(snapshot=>{
      //alert("Storage Up"+i);
      storageRef1.getDownloadURL().subscribe(url=>{
        //alert("storageURL"+i);  
        var obj={url:url,name:snapshot.metadata.name,size:snapshot.metadata.size};
        _this.audio_url.push(obj);
        console.log(url);
        let data={playList_name:name,description:description,playlist:_this.audio_url,date:date};
  
        //update to database
        _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('my_playlist').doc('playlist').set(data).then(()=>{
          console.log("Success");
          _this.isUploading=false;
        }).catch(err=>{
          console.log(err);
        });
      });
    }).catch(err=>{
      console.log(err);
    });

  }
   //reset form
   this.reset_form();

  }

  reset_form(){
    this.form.reset();
    // (<HTMLInputElement>document.getElementById('playlist_name')).value="";
    // (<HTMLInputElement>document.getElementById('description')).value="";
    (<HTMLInputElement>document.getElementById('playlist_uploader')).value="";
    (<HTMLInputElement>document.getElementById('remove_file')).style.display="none";
    (<HTMLInputElement>document.getElementById('size')).innerHTML="";

  }





}
