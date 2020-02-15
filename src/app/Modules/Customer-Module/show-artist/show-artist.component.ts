import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-show-artist',
  templateUrl: './show-artist.component.html',
  styleUrls: ['./show-artist.component.scss']
})
export class ShowArtistComponent implements OnInit {

  constructor(private db:AngularFirestore) { }

  artist_array:any=[];
  playlist:any;
  isLoaded:boolean=false;
  isProcessing:boolean=false;
  searchText:string;

  ngOnInit() {
    this.loadAll();
  }

//select all artist available
  loadAll(){
    var _this=this;
    this.db.firestore.collection('register_user').get().then(docs=>{
      if(docs.empty) console.log("Empty Data");
      else{
        docs.forEach(doc=>{
          if(doc.data().role==="artist")
        _this.artist_array.push(doc.data());
        })
        
      }
    })
    
  }

  //get artist's playlist(available songs) using his/her email
  getPlaylist(email:any){
    this.isLoaded=true;
    this.isProcessing=true;
    this.playlist=[];
    var _this=this;
    this.db.firestore.collection(('register_user')).doc(email).collection("my_playlist").doc("playlist").get().then(docs=>{
      if (!docs.exists) console.log("Empty Data"); 
      else{
        _this.playlist=docs.data().playlist;
      } 
      _this.isProcessing=false;
    })
 }

}
