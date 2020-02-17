import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { item_types } from '../../../../scripts/item_types.js';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import CryptoJS from 'crypto-js';
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
  quantity:number=1;
  searchText:string;
  modalData:any=[{id:'',date:'',time:'',name:'',price:'',type:''}];
  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    deactivate_searchBar();
    this.itemTypes=item_types;
    this.loadAll();
  }

  loadAll(){
    var _this=this;
    if(localStorage.getItem('role')==='supplier') var user=localStorage.getItem('user_name');
    else var user=localStorage.getItem('searched_user_email');
    this.db.firestore.collection('register_user').doc(user).collection('our_items').get().then(doc=>{
      if(doc.empty) _this.isEmpty=true;
      else{
        _this.isEmpty=false;
        doc.forEach(docs=>{
           console.log(docs.data());
          _this.productArray.push(docs.data());
        })
      }
    });
    //localStorage.removeItem('searched_user_email');
  }

  filterProduct(event:any){
    var _this=this;
    var val=event.value;
    console.log(val);
    if(val==='CH') this.selection="Chair";
    else if(val==='LT') this.selection="Lights";
    else if(val==='TB') this.selection="Table";
    else if(val==='MC') this.selection="Musical Items";
    else this.selection="All";
    this.productArray=[];
    this.db.firestore.collection('register_user').doc(localStorage.getItem('searched_user_email')).collection('our_items').get().then(doc=>{
      if(doc.empty) _this.isEmpty=true;
      else{
        doc.forEach(docs=>{
          _this.isEmpty=false;
          if(docs.data().item_type===val)
         _this.productArray.push(docs.data());
         else if(val==="all") _this.productArray.push(docs.data())
        })
      }
    })
  }

  openModal(code:any,name:string,price:any,type:string){
    this.modalData=[];
    let today=new Date();
    let date=today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
    let time=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    let bookingId=code+"@"+date;
    let hashedId=CryptoJS.SHA256(bookingId).toString();
    let obj={id:hashedId,date:date,time:time,name:name,price:price,type:type,code:code};
    this.modalData.push(obj);
  }

  bookProduct(){
    var _this=this;
    let id=this.modalData[0].id;
    let code=this.modalData[0].code;
    let item_name=this.modalData[0].name;
    let date=this.modalData[0].date;
    let time=this.modalData[0].time;
    let price=this.quantity*this.modalData[0].price;
    let type=this.modalData[0].type;
    let obj={name:item_name,id:id,date:date,time:time,price:price,type:type};
    this.db.collection('bookings').doc(id).set(obj).then(()=>{
      _this.modalData=[];
      console.log("Booked Item");
    }).catch(err=>{
      console.log(err);
    });

    this.db.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').get().then(doc=>{
      if(doc.empty) console.log("Empty");
      else{
        doc.forEach(docs=>{
          if(docs.data().code===code){
            _this.db.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').doc(id).update({quantity:docs.data().quantity-_this.quantity})
          }
        })
      }
    })

    let btn=document.getElementById('close_btn') as HTMLElement;
    btn.click();
  }


}
