import { Component, OnInit } from '@angular/core';
import { faq} from '../../../scripts/faq.js';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  faq:any=[]
  constructor() { }

  ngOnInit() {
    this.faq=faq;
  }

}
