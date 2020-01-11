import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { disable_cancel_req } from '../../../../scripts/disable_a_href';
@Component({
  selector: 'app-view-request-status',
  templateUrl: './view-request-status.component.html',
  styleUrls: ['./view-request-status.component.scss']
})
export class ViewRequestStatusComponent implements OnInit {

  reqStatusArray:any=[];
  constructor(private database:AngularFirestore) { }

  ngOnInit() {
    disable_cancel_req();
    this.loadReqStatus();
  }

  //load user requests
  loadReqStatus(){
    var _this=this;
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').get().then(doc=>{
      if(doc.empty) console.log("Empty data");
      else{
        doc.forEach(docs=>{
          for(var i=0;i<docs.data().user_data.length;i++){
            var obj={status:docs.data().user_data[i].status,user:{email:docs.data().user_data[i].user.email,name:docs.data().user_data[i].user.name},date:docs.data().date,event_id:docs.data().event_id,event_name:docs.data().event_name};
            _this.reqStatusArray.push(obj);    //get user requests to an array
          }
        })
      }
    })
  }

  cancelReq(email:string,id:any){
    this.reqStatusArray=this.reqStatusArray.filter(x=>x.user.email!==email);
    this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(id).update({user_data:this.reqStatusArray});
    this.database.collection('register_user').doc(email).collection('bookings').doc(id).delete().then(()=>{
      console.log("Successfully deleted")
    }).catch(err=>{
      console.log(err);
    })
  }

}
