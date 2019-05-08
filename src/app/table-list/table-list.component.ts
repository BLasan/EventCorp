import { Component, OnInit ,OnDestroy} from '@angular/core';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit,OnDestroy{
  socket:any='';
  data:any=[];
  constructor() {
    
   }

  ngOnInit() {

    this.socket=io('http://localhost:4600/my-table',{path:'/my-table'});
    this.socket.on('update',data=>{
      console.log(data);
      this.data=data;
    });
  
    
   

  }

  ngOnDestroy(){

    this.socket.disconnect();
    this.socket.close();

  }
}
