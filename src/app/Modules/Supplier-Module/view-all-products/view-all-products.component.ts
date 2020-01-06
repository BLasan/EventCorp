import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { item_types } from '../../../../scripts/item_types.js';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate'
@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.scss']
})
export class ViewAllProductsComponent implements OnInit {

  isEmpty:boolean=false;
  productArray:any=[];
  itemTypes:any;
  selection:string="All";
  searchText:string;
  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    deactivate_searchBar();
    this.itemTypes=item_types;
    this.loadAll();
  }

  loadAll(){
    var _this=this;
    this.db.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').get().then(doc=>{
      if(doc.empty) _this.isEmpty=true;
      else{
        _this.isEmpty=false;
        doc.forEach(docs=>{
          //console.log(docs.data());
          _this.productArray.push(docs.data());
        })
      }
    })
  }

  filterProduct(event:any){
    var _this=this;
    var val=event.value;
    if(val==='CH') this.selection="Chair";
    else if(val==='LT') this.selection="Lights";
    else if(val==='TB') this.selection="Table";
    else if(val==='MC') this.selection="Musical Items";
    else this.selection="All";
    this.productArray=[];
    this.db.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').get().then(doc=>{
      if(doc.empty) _this.isEmpty=true;
      else{
        doc.forEach(docs=>{
          if(docs.data().item_type===val)
         _this.productArray.push(docs.data());
         else if(val==="all") _this.productArray.push(docs.data())
        })
      }
    })
  }

}
