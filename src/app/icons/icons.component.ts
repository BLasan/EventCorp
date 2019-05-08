import { Component, OnInit } from '@angular/core';
import {IssuesService} from '../issues.service';
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

  constructor(private issueService:IssuesService) {

   }

   
 /*  getAllPosts(){
    return this.http.get('/gets').map((gets)=>{
      return gets;
  })
};
*/
  ngOnInit() {


    this.issueService.getAllPosts().subscribe(gets=>{
      
      console.log(gets);
      this.gets=gets;

    })
   
}
}
