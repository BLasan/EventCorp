import { Component, OnInit } from '@angular/core';
import {paypalClient} from '../../../scripts/organizer/paypal.js'
@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.scss']
})
export class PaypalPaymentComponent implements OnInit {

  amount:number=1000.00;
  constructor() { }

  ngOnInit() {
   // paypalClient()
  }

  changeQuantity(){
    let quantity=parseInt((<HTMLInputElement>document.getElementById('quantityInput')).value);
    let unitPrice=parseFloat((<HTMLInputElement>document.getElementById('unitPrice')).value);
    this.amount=quantity*unitPrice;
    (<HTMLInputElement>document.getElementById('amount')).innerHTML=this.amount.toString();
  }

}
