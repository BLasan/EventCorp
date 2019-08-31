import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistServicesService {

  private _url="http://localhost:4600";

  constructor(private http: HttpClient) { }

  loadData(){

  }

  
  
}
