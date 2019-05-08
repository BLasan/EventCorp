import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  uri='http://localhost:4600';

  constructor(private http:HttpClient) {
const url = "http://localhost:4200"; // site that doesn’t send Access-Control-*
fetch(url)
.then(response => response.json())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
   }

  getAllPosts(){
    const postApi='https://jsonplaceholder.typicode.com';
    return this.http.get(`${this.uri}/gets`);
  }

}
