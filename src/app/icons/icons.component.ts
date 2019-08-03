import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs-compat/operator/map';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  gets:any=[];

  constructor() {

   }

   
 /*  getAllPosts(){
    return this.http.get('/gets').map((gets)=>{
      return gets;
  })
};
*/
  ngOnInit() {


   
   
}
}
