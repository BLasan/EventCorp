import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-supplier-products-table',
  templateUrl: './supplier-products-table.component.html',
  styleUrls: ['./supplier-products-table.component.scss']
})
export class SupplierProductsTableComponent implements OnInit {

  items_array:any=[];
  searchText:string;
  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.loadAll();
  }

  //load all items
  loadAll(){
    var _this=this;
    this.db.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').get().then(docs=>{
      if(docs.empty) console.log("Empty Data");
      else{
        docs.forEach(doc=>{
          _this.items_array.push(doc.data());
        })
      }
    })
  }


  //remove products
  remove(code:any,event:any){
    event.preventDefault();
    var _this=this;
    this.items_array=this.items_array.filter(x=>x.code!==code);
    this.db.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').doc(code).delete().then(()=>{
      console.log("Successfully Removed");
    }).catch(err=>{
      console.log(err);
    })
  }

}
