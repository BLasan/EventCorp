import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import CryptoJS from 'crypto-js';
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
  item_email:string;
  _id:any;
  booking_id:any;
  constructor(private route:ActivatedRoute,private database:AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.item_name=params.user_name;
      this.quantity=params.quantity;
      this.item_email=params.user_email;
      this.amount=params.amount;
      this.booking_id=params.booking_id;
      this._id=params._id;
      this.form=new FormGroup({
        first_name:new FormControl('',[Validators.required]),
        last_name:new FormControl('',[Validators.required]),
        address:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required,Validators.email]),
        phone:new FormControl('',Validators.required),
        city:new FormControl('',Validators.required),
        items:new FormControl(this.item_name,Validators.required),
      })
      console.log(this.amount);
   });
  }


  //get all data
  getData(){
    var _this=this;
    let first_name=this.form.get('first_name').value;
    let last_name=this.form.get('last_name').value;
    let email=this.form.get('email').value;
    let address=this.form.get('address').value;
    let phone=this.form.get('phone').value;
    let city=this.form.get('city').value;
    let receiver_name=this.item_name;
    let amount=this.amount;
    let receiver_email=this.item_email;
    let today=new Date();
    let booking_id=this._id;
    var btn=document.getElementById('checkout_user');
    let count_id;
    let count;
    let _count;

    //error handelling
    // try{
    //   count_id=(<HTMLElement>document.getElementById('notification_count_id'));
    //   alert(count_id)
    //   count=count_id.innerHTML.toString();   //get current notification count
    //   _count=parseInt(count)-1;
    // }
    // catch(ex){
    //   console.log(ex);
    // }

    //add to database
    let obj={name:first_name+" "+last_name,payer_email:email,address:address,phone:phone,city:city,receiver_name:receiver_name,receiver_email:receiver_email,amount:amount,date:today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate(),time:today.getHours()+":"+today.getMinutes()+":"+today.getSeconds(),status:"Paid"};
    let _id=CryptoJS.SHA256("Bill"+"@"+new Date()+receiver_email+email).toString();
    this.database.collection('user_billing').doc(_id).set(obj).then(()=>{
      console.log("Added");
      _this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').doc(this.booking_id).update({view:true}).then(()=>{
         _this.database.firestore.collection('register_user').doc(_this.item_email).collection('bookings').doc(_this._id).update({paid:true}).then(()=>{
           console.log("Success");
          //redirect to the url
         // count_id.innerHTML=_count.toString();     //update count
          btn.click();

         }).catch(err=>{
           console.log(err)
         })
      }).catch(err=>{
        console.log(err);
      });
    }).catch(err=>{
      console.log(err);
    });

  }



}
