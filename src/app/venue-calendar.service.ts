import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VenueCalendarService {

  constructor(private http:HttpClient) { }
  getData():Observable<any[]>{
    
    return this.http.get<any[]>('api/events.json');
  }
}
