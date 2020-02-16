import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {

  name:string;
  address:string;
  email:string;
  id:any;
  date:any;
  time:any;
  amount:any;
  user_name:string;
  invoice_id:any;
  count:number=0;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name=params['name'];
      this.user_name=params['user_name'];
      this.address=params['city'];
      this.id=params['event_id'];
      this.date=params['date'];
      this.time=params['time'];
      this.amount=params['amount'];
      this.email=params['email'];
      this.invoice_id=this.generateKey(this.email,this.user_name,this.date)
   });
  }

  //generate moderator key
  generateKey(email,user_name,date){
    this.count=0;
    let string=email+user_name+date;
    let string_length=string.length;
    //alert(string_length)
    for(var i=0;i<string_length;i++){
     this.count+=(Math.ceil(string.charCodeAt(i)*Math.pow(10,i)));
     //alert(this.count)
    }

   let count_string=this.count.toString();
   var beg=Math.ceil(count_string.length/2)-2;

   let sub_id=count_string.substr(beg,6);

   let key=sub_id

    return key;
  }

}
