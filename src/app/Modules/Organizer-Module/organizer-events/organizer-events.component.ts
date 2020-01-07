import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import {calendar} from '../../../../scripts/artist/artist_calendar.js'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ProfileService } from 'app/services/organizer_services.service';
import {upload_images,upload_video,delete_image,delete_video} from '../../../../scripts/event_image_uploader';
import { AngularFirestore } from '@angular/fire/firestore';
import dayGridPlugin from '@fullcalendar/daygrid';
import { VenueCalendarService } from 'app/venue-calendar.service';

@Component({
  selector: 'app-organizer-events',
  templateUrl: './organizer-events.component.html',
  styleUrls: ['./organizer-events.component.scss']
})
export class OrganizerEventsComponent implements OnInit,AfterViewInit,OnDestroy{

  calendarEvents:any[]=[];
  calendarPlugins=[dayGridPlugin];

  constructor(private svc:VenueCalendarService) { }

  ngOnInit() {
    this.svc.getData().subscribe(data=> this.calendarEvents=data);

  }

  ngAfterViewInit(){

  }

  ngOnDestroy(){

  }
  // @ViewChild('multiSelect') multiSelect: MatSelect;
  // form: any;
  // user_events:any=[];
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  // artistList:any=[];
  // organizerList:any=[];
  // venue_ownerList:any=[];
  // supplierList:any=[];
  // isLoaded:boolean=false;
  // public artist_data: FormControl = new FormControl();
  // public venue_owner_data: FormControl = new FormControl();
  // public supplier_data: FormControl = new FormControl();
  // public bankMultiCtrl: FormControl = new FormControl();
  // public bankMultiFilterCtrl: FormControl = new FormControl();
  // public filteredBanksMulti: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  // protected _onDestroy = new Subject<void>();
  // user_name:string;
  // user_role:string;
  // constructor(private _organizer_services:ProfileService,private database:AngularFirestore) { }
 
  // ngOnInit() {
  //   // calendar();
  //   deactivate_searchBar();
  //   upload_images();
  //   upload_video();
  //   delete_image();
  //   delete_video();
  //   this.user_name=localStorage.getItem('user_name');
  //   this.user_role=localStorage.getItem('role');
  //   this.loadUserEvents(this.user_name);
  //   this.load_all_users();
  //   this.filteredBanksMulti.next(this.toppingList.slice());
  //   this.form=new FormGroup({
  //     event_name:new FormControl('',Validators.required),
  //     venue:new FormControl('',[Validators.required]),
  //     date:new FormControl('',[Validators.required]),
  //     time:new FormControl('',[Validators.required])
  //   });

  //   // this.bankMultiFilterCtrl.valueChanges
  //   //   .pipe(takeUntil(this._onDestroy))
  //   //   .subscribe(() => {
  //   //     this.filterBanksMulti();
  //   //   });

  // }

  // ngOnDestroy() {
  //   this._onDestroy.next();
  //   this._onDestroy.complete();
  // }

  // ngAfterViewInit(){
    
  // }
  // public hasError = (controlName: string, errorName: string) =>{
  //   return this.form.controls[controlName].hasError(errorName);
  // }

  // protected filterBanksMulti() {
  //   if (!this.artistList || !this.organizerList || !this.supplierList || !this.venue_ownerList) {
  //     return;
  //   }
  //   // get the search keyword
  //   let search = this.bankMultiFilterCtrl.value;

  //   if (!search) {
  //     // this.filteredBanksMulti.next(this.toppingList.slice());
  //     this.filteredBanksMulti.next(this.artistList.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   // filter the banks
  //   this.filteredBanksMulti.next(
  //     this.toppingList.filter(list=>list.toLowerCase().indexOf(search) > -1)
  //   );
  // }

  // loadUserEvents(user_name:string){
  //   var _this=this;
  //   var docRef = this.database.firestore.collection('register_user').doc(user_name).collection('MyEvents');
  //   docRef.get().then(snapshot => {
  //     if (snapshot.empty) {
  //       console.log('No matching documents.');
  //     }  
  //     snapshot.forEach(doc => {
  //       console.log(doc.id, '=>', doc.data());
  //       _this.user_events.push(doc.data());
  //     });
  //     })
  //   .catch(err => {
  //     console.log('Error getting documents', err);
  //   });
  //   // this._organizer_services.loadEvents(user_name).subscribe((data)=>{
  //   // this.user_events=data;
  //   // console.log(this.user_events.data[0].time+"=>EVENT DATA");
  //   // calendar(this.user_events.data);
  //   // });

  //   calendar(this.user_events)
  // }

  // onSubmit(){

  // }

  // load_all_users(){
  //   var _this=this;
  //   this.database.firestore.collection('register_user').get().then(snapshot=>{
  //     if(snapshot.empty)
  //     console.log("Empty Data");
  //     else{
  //       snapshot.forEach(doc=>{
  //         if(doc.data().role=="artist"){
  //           _this.artistList.push(doc.data());
  //         }
  //         else if(doc.data().role=="organizer"){
  //           _this.organizerList.push(doc.data());
  //         }
  //         else if(doc.data().role=="venue_owner"){
  //           _this.venue_ownerList.push(doc.data());
  //         }
  //         else if(doc.data().role=="supplier"){
  //           _this.supplierList.push(doc.data());
  //         }
  //       });
  //       _this.isLoaded=true;
  //     }

  //     if(_this.isLoaded){
  //       _this.bankMultiFilterCtrl.valueChanges
  //       .pipe(takeUntil(_this._onDestroy))
  //       .subscribe(() => {
  //         _this.filterBanksMulti();
  //       });
  //     }
  //   })
  // }

}
