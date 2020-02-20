import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import {calendar} from '../../../../scripts/artist/artist_calendar.js'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelect, MatSnackBar } from '@angular/material';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { take, takeUntil, tap, map } from 'rxjs/operators';
import { ProfileService } from 'app/services/organizer_services.service';
import { disable_event_links } from '../../../../scripts/disable_a_href.js';
import {upload_images,upload_video,delete_image,delete_video} from '../../../../scripts/event_image_uploader';
import { disable_uploaders } from '../../../../scripts/disable_a_href';
import { AngularFirestore } from '@angular/fire/firestore';
import CryptoJS from 'crypto-js';
import { AngularFireStorage } from '@angular/fire/storage';
import dayGridPlugin from '@fullcalendar/daygrid';
import { VenueCalendarService } from 'app/venue-calendar.service';
@Component({
  selector: 'app-organizer-events',
  templateUrl: './organizer-events.component.html',
  styleUrls: ['./organizer-events.component.scss']
})
export class OrganizerEventsComponent implements OnInit,AfterViewInit,OnDestroy{
  // @ViewChild('multiSelect') multiSelect: MatSelect;
  form: any;
  user_events:any=[];
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  artistList:any=[];
  venue_ownerList:any=[];
  supplierList:any=[];
  isLoaded:boolean=false;
  prefferedRole:string="none";
  calendarEvents:any[]=[];
  calendarPlugins=[dayGridPlugin];
  // public artist_data: FormControl = new FormControl();
  // public venue_owner_data: FormControl = new FormControl();
  // public supplier_data: FormControl = new FormControl();
  // public bankMultiCtrl: FormControl = new FormControl();
  // public bankMultiFilterCtrl: FormControl = new FormControl();
  // public filteredBanksMulti: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected _onDestroy = new Subject<void>();
  user_name:string;
  user_role:string;
  selected_artists:any=[];
  selected_suppliers:any=[];
  selected_venue:any=[];
  isSelectedArtist:boolean=false;
  isSelectedSupp:boolean=false;
  isSelectedVen:boolean=false;
  imageFile:FileList;
  videoFile:FileList;
  isCreating:boolean=false;
  eventName:string;
  eventId:any;
  constructor(private _organizer_services:ProfileService,private database:AngularFirestore,private storage:AngularFireStorage,private snackBar:MatSnackBar,private svc:VenueCalendarService) { }
 
  ngOnInit() {
    this.getData().subscribe(data=>{
      // if(data.length>1)
      calendar(data);
      // else
      // calendar({});
    })
    disable_event_links();
    deactivate_searchBar();
    disable_uploaders();
    // this.svc.getData().subscribe(data=> this.calendarEvents=data);
    // upload_images();
    // upload_video();
    // delete_image();
    // delete_video();
    this.user_name=localStorage.getItem('user_name');
    this.user_role=localStorage.getItem('role');
    //this.loadUserEvents(this.user_name);
    //this.load_all_users();
    //this.filteredBanksMulti.next(this.toppingList.slice());
    this.form=new FormGroup({
      event_name:new FormControl('',Validators.required),
      // venue:new FormControl('',[Validators.required]),
      date:new FormControl('',[Validators.required]),
      time:new FormControl('',[Validators.required])
    });

    // this.bankMultiFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterBanksMulti();
    //   });

  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit(){
    
  }


  //check errors in formfilelds
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

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

  //load events
  loadUserEvents(user_name:string){
    var _this=this;
    var docRef = this.database.firestore.collection('register_user').doc(user_name).collection('MyEvents');
    docRef.get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
      }  
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        _this.user_events.push(doc.data());
      });
      })
    .catch(err => {
      console.log('Error getting documents', err);
    });
    // this._organizer_services.loadEvents(user_name).subscribe((data)=>{
    // this.user_events=data;
    // console.log(this.user_events.data[0].time+"=>EVENT DATA");
    // calendar(this.user_events.data);
    // });
  }



  //load data to calendar
  getData():Observable<any[]>{
    document.getElementById('calendar').removeAttribute('style');
    return this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').valueChanges().pipe(
      tap(events=> console.log(events)), //this is added to observe the data which are retrieving from the database and passed to the 'events' array
      map(events => events.map(event => { //the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format 
        let data:any=event;
        let obj:any;
        if(data)
        obj={title:data.event_name,start:new Date(data.date),constraint:"Musical Show"};
        else 
        obj={};
        return obj;
      }))
    );
  }


  //create event
  submit(){
    this.isCreating=true;
    var _this=this;
    let event_name=this.form.get('event_name').value;
    this.eventName=event_name;
    let date=this.form.get('date').value;
    let date_string=new Date(date).getFullYear()+"-"+(new Date(date).getMonth()+1)+"-"+new Date(date).getDate();
    let time=this.form.get('time').value;
    //let time_string=new Date(time).getHours()+":"+new Date(time).getMinutes()+":"+new Date(time).getSeconds();
    let today=new Date();
    let event_id=localStorage.getItem('user_name')+"@"+today+event_name;
    let hash_id=CryptoJS.SHA256(event_id).toString();
    this.eventId=hash_id;
    let image_id="Events/"+localStorage.getItem('user_name')+"/"+hash_id+"/"+"coverPic";
    let storageRef=this.storage.ref(image_id);
    let videoId="Events/"+localStorage.getItem('user_name')+"/"+hash_id+"/"+"coverVideo";
    let storageVideoRef=this.storage.ref(videoId);
    let artist=this.selected_artists;
    let supplier=this.selected_suppliers;
    let venue=this.selected_venue;
    if(this.videoFile)
    var video=this.videoFile.item(0);
    //console.log(this.videoFile.item(0));
    if(this.videoFile && this.imageFile){
      storageRef.put(this.imageFile.item(0)).then(snapshot=>{
        storageRef.getDownloadURL().subscribe(url=>{
          console.log(video);
          storageVideoRef.put(video).then(snapshot=>{
            storageVideoRef.getDownloadURL().subscribe(url1=>{
  
              let obj={event_name:event_name,date:date_string,time:time,event_id:hash_id,image_path:url,video_path:url1,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
              _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(hash_id).set(obj).then(()=>{
                console.log("Successfully Created");
                _this.isCreating=false;
  
                let date=new Date();
                let allUsers:any=[];
                let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            
                //send requests for artists
                for(var i=0;i<artist.length;i++){
                  let obj={user:artist[i],status:"Pending"};
                  allUsers.push(obj);
                  let booking_request={event_name:event_name,event_id:hash_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
                  _this.database.collection('register_user').doc(artist[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
                    console.log("Successfully Sent");
                  }).catch(err=>{
                    console.log(err);
                  });
                }
            
                //send requests to suppliers
                for(var i=0;i<supplier.length;i++){
                  let obj={user:supplier[i],status:"Pending"};
                  allUsers.push(obj);
                  let booking_request={event_name:event_name,event_id:hash_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
                  _this.database.collection('register_user').doc(supplier[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
                    console.log("Successfully Sent");
                  }).catch(err=>{
                    console.log(err);
                  });
                }
            
                //send requests to venues
                for(var i=0;i<venue.length;i++){
                  let obj={user:venue[i],status:"Pending"};
                  allUsers.push(obj);
                  let booking_request={event_name:event_name,event_id:event_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
                  _this.database.collection('register_user').doc(venue[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
                    console.log("Successfully Sent");
                  }).catch(err=>{
                    console.log(err);
                  });
                }
            
            
                //keep track of sent requests
                let obj={user_data:allUsers,event_name:event_name,event_id:hash_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
                _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(hash_id).set(obj).then(()=>{
                  console.log("Successfully Added BookingStatus");
                }).catch(err=>{
                  console.log(err);
                })
  
                _this.snackBar.open("Successfully Created","OK", {
                  duration: 3000,
                });
              }).catch(err=>{
                console.log(err);
                _this.isCreating=false;
                _this.snackBar.open("Error Creating","Try Again", {
                  duration: 3000,
                });
              }).catch(err=>{
                _this.isCreating=false
                _this.snackBar.open("Error Creating","Try Again", {
                  duration: 3000,
                });
              })
            })
          }).catch(err=>{
            _this.isCreating=false;
            _this.snackBar.open("Error Creating","Try Again", {
              duration: 3000,
            });
          })
        })
      }).catch(err=>{
        _this.isCreating=false;
        _this.snackBar.open("Error Creating","Try Again", {
          duration: 3000,
        });
      });
    }
    else if(this.imageFile && !this.videoFile){
      storageRef.put(this.imageFile.item(0)).then(snapshot=>{
        storageRef.getDownloadURL().subscribe(url=>{
              let obj={event_name:event_name,date:date_string,time:time,event_id:hash_id,image_path:url,video_path:null,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
              _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(hash_id).set(obj).then(()=>{
                console.log("Successfully Created");
                _this.isCreating=false;
  
                let date=new Date();
                let allUsers:any=[];
                let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            
                //send requests for artists
                for(var i=0;i<artist.length;i++){
                  let obj={user:artist[i],status:"Pending"};
                  allUsers.push(obj);
                  let booking_request={event_name:event_name,event_id:hash_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
                  _this.database.collection('register_user').doc(artist[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
                    console.log("Successfully Sent");
                  }).catch(err=>{
                    console.log(err);
                  });
                }
            
                //send requests to suppliers
                for(var i=0;i<supplier.length;i++){
                  let obj={user:supplier[i],status:"Pending"};
                  allUsers.push(obj);
                  let booking_request={event_name:event_name,event_id:hash_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
                  _this.database.collection('register_user').doc(supplier[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
                    console.log("Successfully Sent");
                  }).catch(err=>{
                    console.log(err);
                  });
                }
            
                //send requests to venues
                for(var i=0;i<venue.length;i++){
                  let obj={user:venue[i],status:"Pending"};
                  allUsers.push(obj);
                  let booking_request={event_name:event_name,event_id:event_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
                  _this.database.collection('register_user').doc(venue[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
                    console.log("Successfully Sent");
                  }).catch(err=>{
                    console.log(err);
                  });
                }
            
            
                //keep track of sent requests
                let obj={user_data:allUsers,event_name:event_name,event_id:hash_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
                _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(hash_id).set(obj).then(()=>{
                  console.log("Successfully Added BookingStatus");
                }).catch(err=>{
                  console.log(err);
                })
  
                _this.snackBar.open("Successfully Created","OK", {
                  duration: 3000,
                });
              }).catch(err=>{
                console.log(err);
                _this.isCreating=false;
                _this.snackBar.open("Error Creating","Try Again", {
                  duration: 3000,
                });
              }).catch(err=>{
                _this.isCreating=false
                _this.snackBar.open("Error Creating","Try Again", {
                  duration: 3000,
                });
              })
            });
      }).catch(err=>{
        _this.isCreating=false;
        _this.snackBar.open("Error Creating","Try Again", {
          duration: 3000,
        });
      });
    }
    else if(!this.imageFile && this.videoFile){
      storageRef.put(this.videoFile.item(0)).then(snapshot=>{
        storageRef.getDownloadURL().subscribe(url=>{ 
              let obj={event_name:event_name,date:date_string,time:time,event_id:hash_id,image_path:null,video_path:url,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
              _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(hash_id).set(obj).then(()=>{
                console.log("Successfully Created");
                _this.isCreating=false;
  
                let date=new Date();
                let allUsers:any=[];
                let date_string=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
            
                //send requests for artists
                for(var i=0;i<artist.length;i++){
                  let obj={user:artist[i],status:"Pending"};
                  allUsers.push(obj);
                  let booking_request={event_name:event_name,event_id:hash_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
                  _this.database.collection('register_user').doc(artist[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
                    console.log("Successfully Sent");
                  }).catch(err=>{
                    console.log(err);
                  });
                }
            
                //send requests to suppliers
                for(var i=0;i<supplier.length;i++){
                  let obj={user:supplier[i],status:"Pending"};
                  allUsers.push(obj);
                  let booking_request={event_name:event_name,event_id:hash_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
                  _this.database.collection('register_user').doc(supplier[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
                    console.log("Successfully Sent");
                  }).catch(err=>{
                    console.log(err);
                  });
                }
            
                //send requests to venues
                for(var i=0;i<venue.length;i++){
                  let obj={user:venue[i],status:"Pending"};
                  allUsers.push(obj);
                  let booking_request={event_name:event_name,event_id:event_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
                  _this.database.collection('register_user').doc(venue[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
                    console.log("Successfully Sent");
                  }).catch(err=>{
                    console.log(err);
                  });
                }
            
            
                //keep track of sent requests
                let obj={user_data:allUsers,event_name:event_name,event_id:hash_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
                _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(hash_id).set(obj).then(()=>{
                  console.log("Successfully Added BookingStatus");
                }).catch(err=>{
                  console.log(err);
                })
  
                _this.snackBar.open("Successfully Created","OK", {
                  duration: 3000,
                });
              }).catch(err=>{
                console.log(err);
                _this.isCreating=false;
                _this.snackBar.open("Error Creating","Try Again", {
                  duration: 3000,
                });
              }).catch(err=>{
                _this.isCreating=false
                _this.snackBar.open("Error Creating","Try Again", {
                  duration: 3000,
                });
              });
            })
      }).catch(err=>{
        _this.isCreating=false;
        _this.snackBar.open("Error Creating","Try Again", {
          duration: 3000,
        });
      });
    }
    else{
      let obj={event_name:event_name,date:date_string,time:time,event_id:hash_id,image_path:null,video_path:null,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
      _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(hash_id).set(obj).then(()=>{
        console.log("Successfully Created");
        _this.isCreating=false;

        let date=new Date();
        let allUsers:any=[];
        let date_string=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
    
        //send requests for artists
        for(var i=0;i<artist.length;i++){
          let obj={user:artist[i],status:"Pending"};
          allUsers.push(obj);
          let booking_request={event_name:event_name,event_id:hash_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
          _this.database.collection('register_user').doc(artist[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
            console.log("Successfully Sent");
          }).catch(err=>{
            console.log(err);
          });
        }
    
        //send requests to suppliers
        for(var i=0;i<supplier.length;i++){
          let obj={user:supplier[i],status:"Pending"};
          allUsers.push(obj);
          let booking_request={event_name:event_name,event_id:hash_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
          _this.database.collection('register_user').doc(supplier[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
            console.log("Successfully Sent");
          }).catch(err=>{
            console.log(err);
          });
        }
    
        //send requests to venues
        for(var i=0;i<venue.length;i++){
          let obj={user:venue[i],status:"Pending"};
          allUsers.push(obj);
          let booking_request={event_name:event_name,event_id:event_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",paid:false,time:time,venue:venue[0].name};
          _this.database.collection('register_user').doc(venue[i].email).collection('bookings').doc(hash_id).set(booking_request).then(()=>{
            console.log("Successfully Sent");
          }).catch(err=>{
            console.log(err);
          });
        }
    
    
        //keep track of sent requests
        let obj={user_data:allUsers,event_name:event_name,event_id:hash_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
        _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(hash_id).set(obj).then(()=>{
          console.log("Successfully Added BookingStatus");
        }).catch(err=>{
          console.log(err);
        })

        _this.snackBar.open("Successfully Created","OK", {
          duration: 3000,
        });
      }).catch(err=>{
        console.log(err);
        _this.isCreating=false;
        _this.snackBar.open("Error Creating","Try Again", {
          duration: 3000,
        });
      }).catch(err=>{
        _this.isCreating=false
        _this.snackBar.open("Error Creating","Try Again", {
          duration: 3000,
        });
      });
    }
    //this.sendBookingReq();
    document.getElementById('calendar').setAttribute('style','display:none');
    this.reset();
  }



  //reset form
  reset(){
     //reset form and fields
     this.form.reset();
     let image=document.getElementById('image') as HTMLElement;
     image.setAttribute('src','');
     let video=document.getElementById('myVideo') as HTMLElement;
     video.setAttribute('src','');
     (<HTMLInputElement>document.getElementById('imgInput')).value="";
     (<HTMLInputElement>document.getElementById('videoInp')).value="";
     this.selected_venue=[];
     this.selected_artists=[];
     this.selected_suppliers=[];
     this.supplierList=[];
     this.artistList=[];
     this.venue_ownerList=[];
     this.removeImage();
     this.removeVideo();
  }


  //upload images
  uploadImage(){
    upload_images();
  }


  //upload videos
  uploadVideo(){
    upload_video();
  }


  //remove images
  removeImage(){
    delete_image();
  }


  //remove videos
  removeVideo(){
    delete_video();
  }

  //get uploaded images
  get_images(event){
     this.imageFile=event.target.files;
     console.log(this.imageFile.item(0));
  }

  //get uploaded videos
  get_videos(event){
    console.log(event.target.files.name+"=>Videos");
    this.videoFile=event.target.files;
    console.log(this.videoFile.item(0));
  }
  
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
  //           _this.supplierList.push(doc.data());
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


  //load artist
  loadArtist(){
    console.log(this.selected_artists.some(x=>x.email==='benuraab@gmail.com'));
    this.artistList=[];
    this.prefferedRole="artist";
    var _this=this;
    this.database.firestore.collection('register_user').get().then(docs=>{
      if(docs.empty) console.log("Empty users");
      else{
        docs.forEach(doc=>{
          if(doc.data().role==='artist') {
            _this.artistList.push(doc.data());
          }
        })
      }
    })
  }

  //load suppliers
  loadSuppliers(){
    this.supplierList=[];
    this.prefferedRole="supplier";
    var _this=this;
    this.database.firestore.collection('register_user').get().then(docs=>{
      if(docs.empty) console.log("Empty users");
      else{
        docs.forEach(doc=>{
          if(doc.data().role==='supplier') _this.supplierList.push(doc.data());
        })
      }
    }); 
  }

  //load venues
  loadVenues(){
    this.venue_ownerList=[];
    this.prefferedRole="venue";
    var _this=this;
    this.database.firestore.collection('register_user').get().then(docs=>{
      if(docs.empty) console.log("Empty users");
      else{
        docs.forEach(doc=>{
          if(doc.data().role==='venue_owner') _this.venue_ownerList.push(doc.data());
        })
      }
    })
  }

  //add artist
  addArtist(email:string,name:string){
    var obj={email:email,name:name};
    this.selected_artists.push(obj);
    console.log(this.selected_artists);
  }

  //add supplier
  addSupplier(email:string,name:string){
    var obj={email:email,name:name};
    this.selected_suppliers.push(obj);
  }

  //add venue
  addVenue(email:string,name:string){
    var obj={email:email,name:name};
    this.selected_venue.push(obj);
  }

  //remove artist
  removeArtist(email:any){
    this.selected_artists=this.selected_artists.filter(x=>x.email!==email);
  }

  //remove supplier
  removeSupplier(email:string){
    this.selected_suppliers=this.selected_suppliers.filter(x=>x.email!==email);
  }

  //remove venue
  removeVenue(email:string){
    this.selected_venue=this.selected_venue.filter(x=>x.email!==email);
  }

  //check whether artist is added
  isAddedArtist(email:string){
    return this.selected_artists.some(x=>x.email===email);
  }

  //check whether supplier is added
  isAddedSupplier(email:string){
    return this.selected_suppliers.some(x=>x.email===email);
  }

  //check whether venue is added
  isAddedVenue(email:string){
    return this.selected_venue.some(x=>x.email===email);
  }

  //store searched user email
  addUserEmail(email:string){
    alert(email)
    localStorage.setItem('searched_user_email',email);
  }

  sendBookingReq(){
    let date=new Date();
    let allUsers;
    let date_string=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();

    //send requests for artists
    for(var i=0;i<this.selected_artists.length;i++){
      let obj={user:this.selected_artists[i],status:"Pending"};
      allUsers.push(obj);
      let booking_request={event_name:this.eventName,event_id:this.eventId,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:this.selected_artists[i].email,date:date_string,view:false,status:"Pending"};
      this.database.collection('register_user').doc(this.selected_artists[i].email).collection('bookings').doc(localStorage.getItem('user_name')).set(booking_request).then(()=>{
        console.log("Successfully Sent");
      }).catch(err=>{
        console.log(err);
      });
    }

    //send requests to suppliers
    for(var i=0;i<this.selected_suppliers.length;i++){
      let obj={user:this.selected_suppliers[i],status:"Pending"};
      allUsers.push(obj);
      let booking_request={event_name:this.eventName,event_id:this.eventId,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:this.selected_suppliers[i].email,date:date_string,view:false,status:"Pending"};
      this.database.collection('register_user').doc(this.selected_suppliers[i].email).collection('bookings').doc(localStorage.getItem('user_name')).set(booking_request).then(()=>{
        console.log("Successfully Sent");
      }).catch(err=>{
        console.log(err);
      });
    }

    //send requests to venues
    for(var i=0;i<this.selected_venue.length;i++){
      let obj={user:this.selected_suppliers[i],status:"Pending"};
      allUsers.push(obj);
      let booking_request={event_name:this.eventName,event_id:this.eventId,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:this.selected_venue[i].email,date:date_string,view:false,status:"Pending"};
      this.database.collection('register_user').doc(this.selected_venue[i].email).collection('bookings').doc(localStorage.getItem('user_name')).set(booking_request).then(()=>{
        console.log("Successfully Sent");
      }).catch(err=>{
        console.log(err);
      });
    }


    //keep track of sent requests
    this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('bookings').doc(this.eventId).set(allUsers).then(()=>{
      console.log("Successfully Added");
    }).catch(err=>{
      console.log(err);
    })
  }
}
