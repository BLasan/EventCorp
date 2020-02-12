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
    var _this=this;
    (<HTMLInputElement>document.getElementById('progress_bar')).removeAttribute('style');
    this.audio_files=event.target.files;
    alert(this.audio_files.length);

    //remove files from the storage
    try{
      for(var i=0;i<50;i++){
        var audio_id="artist-playlist/"+localStorage.getItem('user_name')+"/"+"audio"+i;
        this.storage.ref(audio_id).delete();
      }
    }catch(ex){
      console.log(ex);
    }

    //upload files to storage bucket and calculate the size
    for(var i=0;i<this.audio_files.length;i++){
      var audio_id="artist-playlist/"+localStorage.getItem('user_name')+"/"+"audio"+i;
      this.refUrlArray.push(audio_id);   //get reference urls to the array
      var storageRef=this.storage.ref(audio_id);
      storageRef.put(this.audio_files[i]).then(snapshot=>{
        storageRef.getDownloadURL().subscribe(url=>{
          var obj={url:url,name:snapshot.metadata.name,size:snapshot.metadata.size};
          _this.audio_url.push(obj);
          _this.total_size+=(snapshot.metadata.size/(1024*1024));
          //reset the progress bar
          if(i==_this.audio_files.length) 
          document.getElementById("progress_bar").style.display = "none";
          (<HTMLInputElement>document.getElementById('size')).innerHTML=(_this.total_size.toFixed(2)).toString()+"MB";
          (<HTMLInputElement>document.getElementById('remove_file')).removeAttribute('style');
        });
      }).catch(err=>{
        console.log(err);
      });
    }
  }

  remove(){
    disable_remove_files();
    (<HTMLInputElement>document.getElementById('remove_file')).style.display="none";
    (<HTMLInputElement>document.getElementById('playlist_uploader')).value="";
    (<HTMLInputElement>document.getElementById('size')).innerHTML="Size: 0MB";
  }

  onSubmit(){
   var _this=this;
   let name=(<HTMLInputElement>document.getElementById('playlist_name')).value;
   let description=(<HTMLInputElement>document.getElementById('description')).value;
   let today=new Date();
   let date=today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
  
  //remove files from the storage
  try{
    for(var i=0;i<this.refUrlArray.length;i++){
      this.storage.ref(this.refUrlArray[i]).delete();
    }
  }catch(ex){
    console.log(ex);
  }
  
  //upload files 
  for(var i=0;i<this.audio_files.length;i++){
    var audio_id="artist-playlist/"+localStorage.getItem('user_name')+"/"+"audio"+i;
    var storageRef=this.storage.ref(audio_id);
    storageRef.put(this.audio_files[i]).then(snapshot=>{
      storageRef.getDownloadURL().subscribe(url=>{
        var obj={url:url,name:snapshot.metadata.name,size:snapshot.metadata.size};
        _this.audio_url.push(obj);
        _this.total_size+=(snapshot.metadata.size/(1024*1024));
        let data={playList_name:name,description:description,playlist:_this.audio_url,date:date};
        _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('my_playlist').doc('playlist').set(data).then(()=>{
          console.log("Success");
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
