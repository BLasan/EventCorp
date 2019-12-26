import { Component, OnInit } from '@angular/core';
import { faq} from '../../../scripts/faq.js';
import { disable_faq_icon} from '../../../scripts/disable_a_href.js';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  faq:any=[];
  showAnswerId:string;
  constructor() { }

  ngOnInit() {
    disable_faq_icon();
    this.faq=faq;
  }

  loadAnswer(id:any){
    this.showAnswerId=id;
  }

}
