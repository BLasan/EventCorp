import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById('home_span').style.display="none";
    document.getElementById('about_span').removeAttribute('style');
    document.getElementById('contact_span').style.display="none";
    document.getElementById('event_span').style.display="none";

    document.getElementById('home_list').setAttribute('class','nav-item');
    document.getElementById('about_list').setAttribute('class','nav-item active');
    document.getElementById('contact_list').setAttribute('class','nav-item');
    document.getElementById('event_list').setAttribute('class','nav-item');
  }

}
