import { Component, OnInit } from '@angular/core';
import {paypalClient} from '../../../scripts/organizer/paypal.js'
@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.scss']
})
export class PaypalPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    paypalClient()
  }

}
