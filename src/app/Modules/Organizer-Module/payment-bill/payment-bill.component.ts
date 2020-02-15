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
  }


  generatePdf(){
    let w="<!DOCTYPE html>"+
    "<html lang='en'>"+
    "<head>"+
    
        "<title>bill</title>"+
        "<meta charest='utf-8'>"+
        "<meta name='viewport' content='width=device.width,initial-scale=1'>"+
        "<link rel='stylesheet' type='text/css' href='main.css'>"+
        "<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>"+
        "<link rel='stylesheet' type='text/css' href='main.css'>"+
    "</head>"+
     
    "<body>"+
          "<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script>"+
           "<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>"+
          "<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM' crossorigin='anonymous'></script>"+
          "<script src='main.js'></script>"+
          
          "<div class='container'>"+
          "<div class='row'>"+
          "<div class='col-md-2 col-lg-3'></div>"+
          "<div class='card col-sm-12 col-md-8 col-lg-6' style='position:center; margin:2rem;>"+
          "<div class='card-body'>"+
          
          "<div class='row header' style='background-color:#f5f5f0'>"+
            "<div class='col-4'>"+
              "<img src='2.png' class='logo' style='height:4rem; margin-top:1em;'>"+
            "</div>"+
            "<div class='col-8' align='right'>"+
              "<h2 style='margin-top:15px'>INVOICE</h2>"+
              "<p style='margin:0'>Invoice Number : </p>"+
              "<p style='margin:0'>Date of Issue : </p>"+
              "<p style='margin:0'>Time : </p>"+
              "</br>"+
            "</div>"+
          "</div>"+
          "<div class='row' style='margin-top:2rem;margin-bottom:2rem'>"+
            "<div class='col-8'>"+
              "<p style='color:gray'>Billed To</p>"+
              "<p style='margin:0'>Organizer Name</p>"+
              "<p style='margin:0'>Address</p>"+
              "<p style='margin:0'>Email</p>"+
              "<br/>"+
              "<p>Event :</p>"+
            "</div>"+
            "<div class='col-4' align='right'>"+
              "<p style='color:gray'>Total Amount</p>"+
              "<h4>Rs.225,000</h4>"+
              "</br>"+
              "<hr style='border:1.3px solid #d6d6c2;margin-bottom:0;margin-top:0;width:80px'>"+
              "<h3 style='color:#d6d6c2' align='center'><b>PAID</b></h3>"+
              "<hr style='border:1.2px solid #d6d6c2;margin-top:0;width:80px'>"+
            "</div>"+    
          "</div>"+
          "<hr style='border:1.2px solid gray;margin-top:0'>"+         
          "<table class='table'>"+
            "<thead>"+
              "<tr>"+
              "<th style='border-bottom-color:white;border-top-color:white'>Description</th>"+
              "<td align='right' style='border-bottom-color:white;border-top-color:white'><b>Amount</b></td>"+
              "</tr>"+
            "</thead>"+
            "<tbody>"+
              "<tr>"+
              "<td scope='row'>Artist Name</td>"+
              "<td align='right' style='border-top-color:white;'>50,000</td>"+
              "</tr>"+  
              "<tr>"+
              "<td scope='row' align='right' style='padding-top:3rem'><b>Total Amount</b></td>"+
              "<td align='right' style='padding-top:3rem'>225,000</td>"+
              "</tr>"+
            "</tbody>"+
          "</table>"+
          "</div>"+
          "<div class='col-md-2 col-lg-3'></div>"+
          "</div>"+
          "</div>"+
          "</div>"+
    "</body>"+
    "</html>";
    
    const documentDefinition = { content: w };
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
