import { Component, OnInit ,OnDestroy} from '@angular/core';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
 
  name='Bena';
  socket:any;
  
  constructor() { 
   
  }

  ngOnInit() {

    // this.socket=io('http://localhost:4700/user',{path:'/user',reconnect:true,forceNew:true});
    // this.socket.on('update_data',data=>{
    //   console.log(data);
    //   this.name=data;
    // });
    

  
  }

  


}
