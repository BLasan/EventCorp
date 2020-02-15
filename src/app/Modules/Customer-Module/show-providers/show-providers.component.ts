import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-show-providers',
  templateUrl: './show-providers.component.html',
  styleUrls: ['./show-providers.component.scss']
})
export class ShowProvidersComponent implements OnInit {

  constructor(private db:AngularFirestore) { }

  provider_array:any=[];
  items_array:any=[];
  isLoaded:boolean=false;
  isProcessing:boolean=false;
  searchText:string;

  ngOnInit() {
    this.loadAll();
  }

//load all equiepment suppliesr available
  loadAll(){
    var _this=this;
    this.db.firestore.collection('register_user').get().then(docs=>{
      if(docs.empty) console.log("Empty Data");
      else{
        docs.forEach(doc=>{
          if(doc.data().role==="supplier")
        _this.provider_array.push(doc.data());
        })
        
      }
    })
    
  }

  getItems(email:any){
    this.isLoaded=true;
    this.isProcessing=true;
    this.items_array=[];
    var _this=this;
    this.db.firestore.collection('register_user').doc(email).collection('our_items').get().then(docs=>{
      if(docs.empty) console.log("Empty Data");
      else{
        docs.forEach(doc=>{
          _this.items_array.push(doc.data());
        })
      }
      this.isProcessing=false;
    })
  }
}
