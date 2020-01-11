import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-users',
  templateUrl: './payment-users.component.html',
  styleUrls: ['./payment-users.component.scss']
})
export class PaymentUsersComponent implements OnInit {

  amount:number;
  item_name:string;
  quantity:number;
  form:any;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.item_name=params.user_name;
      this.quantity=params.quantity;
      this.amount=params.amount;
      this.form=new FormGroup({
        first_name:new FormControl('',[Validators.required]),
        last_name:new FormControl('',[Validators.required]),
        address:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required,Validators.email]),
        phone:new FormControl('',Validators.required),
        city:new FormControl('',Validators.required),
      })
      console.log(this.amount);
   });
  }



}
