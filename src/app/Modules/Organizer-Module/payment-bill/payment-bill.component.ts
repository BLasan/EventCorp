import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import * as PDF from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

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

    this.generatePdf();
  }


  generatePdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    PDF.createPdf(documentDefinition).download();
   }


  //load modal
  openModal(id:any){
    console.log(id)
    this.isModalOpen=true;
    this.filtered_data=this.bill_array.filter(x=>x._id===id);
  }


  //close modal
  close(){
    this.isModalOpen=false;
  }

  //download bill
  downloadBill(){
    this.generatePdf();
  }

}
