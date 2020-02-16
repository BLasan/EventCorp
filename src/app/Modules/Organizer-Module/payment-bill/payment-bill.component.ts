import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import htmlToPdfmake from 'html-to-pdfmake';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import * as PDF from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
declare var pdfMake: any;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-payment-bill',
  templateUrl: './payment-bill.component.html',
  styleUrls: ['./payment-bill.component.scss']
})
export class PaymentBillComponent implements OnInit {

  isEmpty:boolean=false;
  bill_array:any=[];
  searchBill:string;
  filtered_data:any=[];
  isModalOpen:boolean=false;
  bill_id:any;
  constructor(private database:AngularFirestore) { }

  ngOnInit() {
    PDF.vfs = pdfFonts.pdfMake.vfs;
    deactivate_searchBar();
    this.getBills();   //get bills
  }

  //get payment bills
  getBills(){
    var _this=this;
    this.database.firestore.collection('user_billing').get().then(docs=>{
      if(docs.empty) _this.isEmpty=false;
      else{
        docs.forEach(doc=>{
          var obj={_id:doc.id,data:doc.data()}
          _this.bill_array.push(obj);
        })
      }
    });
  }

  //load modal
  openModal(id:any){
    console.log(id);
    this.bill_id=id;
    this.isModalOpen=true;
    this.filtered_data=this.bill_array.filter(x=>x._id===id);
  }


  //close modal
  close(){
    this.isModalOpen=false;
  }

}
