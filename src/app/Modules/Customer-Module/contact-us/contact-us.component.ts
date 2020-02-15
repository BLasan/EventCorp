import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SendMailService } from 'app/services/sendEmail.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit{

  form:any;
  lat: number = 6.9271;
  lng: number = 79.8612;
  zoom: number = 10;
  constructor(private sendMail:SendMailService) { }

  ngOnInit() {

    this.form=new FormGroup({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      contact:new FormControl('',[Validators.required]),
      comment:new FormControl('',[Validators.required])
    });
    
    document.getElementById('home_span').style.display="none";
    document.getElementById('contact_span').removeAttribute('style');
    document.getElementById('event_span').style.display="none";
    document.getElementById('about_span').style.display="none";

    document.getElementById('home_list').setAttribute('class','nav-item');
    document.getElementById('contact_list').setAttribute('class','nav-item active');
    document.getElementById('about_list').setAttribute('class','nav-item')
    document.getElementById('event_list').setAttribute('class','nav-item')
  }


  //init maps
  initMap(){
  
  }

  //get data
  submitQuery(){
    let name=this.form.get('name').value;
    let email=this.form.get('email').value;
    let contact=this.form.get('contact').value;
    let comment=this.form.get('comment').value;

    const email_message_to_reporter={
      to: "benuraab@gmail.com",
      from:email,
      subject: "User Contact",
      text: this.getMessage(name,contact,comment),
      html: '<strong>'+this.getMessage(name,contact,comment)+'</strong>',
    }

    //send mail to reporter
    try{
      this.sendMail.sendEmail(email_message_to_reporter).subscribe((data)=>{
        var _returnedData:any=data;
        if(_returnedData.success===true){
          console.log("Sent to the reporter");
        }
        else{
          console.log("Error sending mail");
        }
      })
    }
    catch(err){
      console.log(err);
    }
  }

  //generate message
  getMessage(name,contact,comment){
    let message="<html><head><title></title></head><body>"+"<br>"+comment+"<br>"+"From : "+name+"<br>"+"Contact : "+contact+"<br>"+"Thank You";
    return message;
  }

}
