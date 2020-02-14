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

  ngOnInit() {
    this.loadAll();
  }

  loadAll(){
    var _this=this;
    this.db.firestore.collection('register_user').doc(localStorage.getItem('user_name')).get().then(docs=>{
      if(!docs.exists) console.log("Empty Data");
      else{
        _this.artist_array.push(docs.data())
      }
    })
  }

}
