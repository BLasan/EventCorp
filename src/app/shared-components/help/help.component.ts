import { Component, OnInit } from '@angular/core';
import { faq} from '../../../scripts/faq.js';
import { disable_faq_icon} from '../../../scripts/disable_a_href.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import CryptoJS from 'crypto-js';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  faq:any=[];
  form:any;
  showAnswerId:string;
  constructor(private database:AngularFirestore) { }

  ngOnInit() {
    disable_faq_icon();
    this.faq=faq;
    this.form=new FormGroup({
      user_name:new FormControl('',Validators.required),
      user_email:new FormControl('',[Validators.required,Validators.email]),
      query:new FormControl('',Validators.required)
    })
  }

  loadAnswer(id:any){
    this.showAnswerId=id;
  }

  submitQuery(){
    var _this=this;
    let name=this.form.get('user_name').value;
    console.log(name);
    let email=this.form.get('user_email').value;
    let message=this.form.get('query').value;
    var date=new Date();
    var _id=email+"@"+date;
    var faq_id=CryptoJS.SHA256(_id).toString();
    let date_time=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    let obj={id:faq_id,name:name,email:email,message:message,timestamp:date_time};
    this.database.collection('faq').doc(faq_id).set(obj).then(()=>{

    }).catch(err=>{
      console.log(err);
    })
    // this.database.firestore.collection('register_user').get().then(snapshot=>{
    //   if(snapshot.empty) console.log("Empty");
    //   else{
    //     snapshot.forEach(docs=>{
    //       if(docs.data().role==='admin'){
    //         _this.database.firestore.collection('register_user').doc(docs.id).collection('notifications').doc(email).set(obj).then(()=>{
    //           console.log("Success");
    //         }).catch(err=>{
    //           console.log(err);
    //         })
    //       }
    //     })
    //   }
    // });
    this.form.reset();
    let element:HTMLElement=document.getElementById('close_modal') as HTMLElement;
    element.click();
  }

}
