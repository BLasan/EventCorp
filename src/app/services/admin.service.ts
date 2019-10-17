import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _url="http://localhost:4600";

  constructor(private http: HttpClient) { }

  loadAllUsers(){
      return this.http.get(`${this._url}/admin_load_all_users`);
  }

  // realtime_update(){
  //   const realtime_data=require('scripts/realtime_monitor');
  //   let data=[];
  //   data=realtime_data.get_realtime_data();
  //   console.log(realtime_data.get_realtime_data()+"->DATA ")
  //   return data;
  // }

  get_realtime(){
    return this.http.get(`${this._url}/get_realtime`);
  }

   
  
}
