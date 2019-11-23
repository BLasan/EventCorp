import { Component, OnInit } from '@angular/core';
import {disable_playlist_uploader} from '../../../../scripts/disable_a_href';
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
  constructor(private database:AngularFirestore,private storage:AngularFireStorage) { }

  ngOnInit() {
    this.form=new FormGroup({
      playlist_name:new FormControl('',[Validators.required]),
      playlist_description:new FormControl('',[Validators.required])
    })
  }

  upload_files(){
    disable_playlist_uploader();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  audio_upload(event){
    var _this=this;
    this.audio_files=event.target.files;
    for(var i=0;i<this.audio_files.length;i++){
      var audio_id="artist-playlist/"+localStorage.getItem('user_name')+"/"+"audio"+i;
      var storageRef=this.storage.ref(audio_id);
      storageRef.put(this.audio_files[i]).then(snapshot=>{
        storageRef.getDownloadURL().subscribe(url=>{
          var obj={url:url,name:snapshot.metadata.name,size:snapshot.metadata.size};
          _this.audio_url.push(obj);
          _this.total_size+=snapshot.metadata.size;
          console.log(_this.total_size);
          (<HTMLInputElement>document.getElementById('size')).innerHTML=(_this.total_size/(1024*1024)).toString();
        });
      })
    }
  }

  onSubmit(){
   var _this=this;
   let name=(<HTMLInputElement>document.getElementById('playlist_name')).value;
   let description=(<HTMLInputElement>document.getElementById('description')).value;
   let today=new Date();
   let date=today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
   let id=name+"@"+date;
   var hash_id= CryptoJS.SHA256(id).toString();
   let data={playList_name:name,description:description,playlist:this.audio_url,date:date};
   this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('my_playlist').doc(hash_id).set(data).then(()=>{
     console.log("Success");
     _this.reset_form();
   }).catch(err=>{
     console.log(err);
   });

  }

  reset_form(){
    (<HTMLInputElement>document.getElementById('playlist_name')).value="";
    (<HTMLInputElement>document.getElementById('description')).value="";
    (<HTMLInputElement>document.getElementById('playlist_uploader')).value="";
    (<HTMLInputElement>document.getElementById('size')).value="";
  }





}
