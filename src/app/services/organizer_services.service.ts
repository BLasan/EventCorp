import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizerServiceService {

  private _url="http://localhost:4600";

  constructor(private http: HttpClient) { }

  loadEvents(user_name:string){
      console.log(user_name)
      return this.http.post(`${this._url}/load_events`,[user_name]);
  }

  
  
}
