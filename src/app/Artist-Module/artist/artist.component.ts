import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {getBioData,removeStorage,getAlbumData} from '../../../scripts/artist/artist_get_data';

// declare function removeStorage():any;

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})

export class ArtistComponent implements OnInit {
  form_data:any=[{"name":null,"address":null,"city":null,"email":" ","country":null,"contact":" "},{"validName":true,"validAddress":true,"validCity":true,"validEmail":true,"validCountry":true,"validContact":true,"validPassword":true}];
  socket:any;
  socket1:any;
  socket2:any;
  initialText:String="<Empty List>"
  bio_data:any={"company":null,"web_site":null,"location":null,"bio":null};
  album_data:any=[{"title":null,"date":null,"location":null,"path":null}];

  constructor() { 
   
  }


  ngOnInit() {

    //call the method to get data
    getBioData();

    //assign data to bio_data
    this.bio_data= JSON.parse(localStorage.getItem('getBioData'));

    // console.log('details',this.bio_data.company);

    //remove the storage
    removeStorage();
  
    this.socket=io('http://localhost:4600/form',{path:'/form',reconnect:true,forceNew:true});
    this.socket.on('update_form',data=>{
      console.log("connected1");
      this.form_data=data;
      console.log(this.form_data[0].name);
    
    });

    // this.socket1=io('http://localhost:4600/bio_data',{path:'/bio_data',reconnect:true,forceNew:true});
    // this.socket1.on('update_bio',data=>{
    //   console.log("connected2");
    //   this.bio_data=data;
    // });

    // this.socket2=io('http://localhost:4600/album_data',{path:'/album_data',reconnect:true,forceNew:true});
    // this.socket2.on('update_album',data=>{
    //   console.log("connected3");
    //   this.album_data=data;
    //   console.log(data[0].path);
    // })

     
  }

  }
  


