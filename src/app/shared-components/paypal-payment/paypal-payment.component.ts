import { Component, OnInit } from '@angular/core';
import {paypalClient} from '../../../scripts/organizer/paypal.js'
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.scss']
})
export class PaypalPaymentComponent implements OnInit {

  amount:number;
  item_name:string;
  quantity:number;
  form:any;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
   // paypalClient()
   this.route.params.subscribe(params => {
     this.item_name=params.item_name;
     this.quantity=params.quantity;
     this.amount=params.amount;
     this.form=new FormGroup({
       first_name:new FormControl('',[Validators.required]),
       last_name:new FormControl('',[Validators.required]),
       address:new FormControl('',[Validators.required]),
       email:new FormControl('',[Validators.required,Validators.email]),
       phone:new FormControl('',Validators.required),
       items:new FormControl(this.item_name,Validators.required),
       city:new FormControl('',Validators.required),
     })
     console.log(this.amount);
  });
  }

  // changeQuantity(){
  //   let quantity=parseInt((<HTMLInputElement>document.getElementById('quantityInput')).value);
  //   let unitPrice=parseFloat((<HTMLInputElement>document.getElementById('unitPrice')).value);
  //   this.amount=quantity*unitPrice;
  //   (<HTMLInputElement>document.getElementById('amount')).innerHTML=this.amount.toString();
  // }

}
