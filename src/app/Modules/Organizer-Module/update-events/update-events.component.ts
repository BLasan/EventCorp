import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { disable_event_links } from '../../../../scripts/disable_a_href.js';
import {upload_images,upload_video,delete_image,delete_video} from '../../../../scripts/event_image_uploader';
import CryptoJS from 'crypto-js';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-update-events',
  templateUrl: './update-events.component.html',
  styleUrls: ['./update-events.component.scss']
})
export class UpdateEventsComponent implements OnInit {

  form:any;
  selected_suppliers:any=[];
  selected_artists:any=[];
  selected_venue:any=[];
  artistList:any=[];
  venue_ownerList:any=[];
  supplierList:any=[];
  prefferedRole:string="none";
  imageFile:FileList;
  videoFile:FileList;
  imageUrl:any;
  videoUrl:any;
  isLoaded:boolean=false;
  isCreating:boolean=false;
  eventName:string;
  eventId:any;
  isRemovedImage:boolean=false;
  isRemovedVideo:boolean=false;
  constructor(private database:AngularFirestore,private route:ActivatedRoute,private storage:AngularFireStorage,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadEvent(params.event_id);
      this.eventId=params.event_id;
   });
  }

  //check errors
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }


  //edit event
  editEvent(){
    this.isCreating=true;
    var _this=this;
    let event_name=this.form.get('event_name').value;
    this.eventName=event_name;
    let date=this.form.get('date').value;
    let date_string=new Date(date).getFullYear()+"-"+(new Date(date).getMonth()+1)+"-"+new Date(date).getDate();
    let time=this.form.get('time').value;
    //let time_string=new Date(time).getHours()+":"+new Date(time).getMinutes()+":"+new Date(time).getSeconds();
    let today=new Date();
    let image_id="Events/"+localStorage.getItem('user_name')+"/"+this.eventId+"/"+"coverPic";
    let storageRef=this.storage.ref(image_id);
    let videoId="Events/"+localStorage.getItem('user_name')+"/"+this.eventId+"/"+"coverVideo";
    let storageVideoRef=this.storage.ref(videoId);
    let artist=this.selected_artists;
    let supplier=this.selected_suppliers;
    let venue=this.selected_venue;
    let _id=this.eventId;
    if(this.videoFile)
    var video=this.videoFile.item(0);
    console.log(artist)
    //console.log(this.videoFile.item(0));

    if(this.isRemovedImage || this.isRemovedVideo){
     alert("1");
      //removed the video
      if(this.isRemovedVideo && this.imageFile){
        storageRef.put(this.imageFile.item(0)).then(snapshot=>{
          storageRef.getDownloadURL().subscribe(url=>{
                let obj={event_name:event_name,date:date_string,time:time,event_id:_id,image_path:url,video_path:null,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
                _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(_id).set(obj).then(()=>{
                  console.log("Successfully Created");
                  _this.isCreating=false;
    
                  let date=new Date();
                  let allUsers:any=[];
                  let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
              
                  //send requests for artists
                  for(var i=0;i<artist.length;i++){
                    let obj={user:artist[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=artist[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(artist[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to suppliers
                  for(var i=0;i<supplier.length;i++){
                    let obj={user:supplier[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=supplier[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(supplier[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                        console.log("Successfully Sent");
                      }).catch(err=>{
                        console.log(err);
                      });
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to venues
                  for(var i=0;i<venue.length;i++){
                    let obj={user:venue[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=venue[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(venue[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                        console.log("Successfully Sent");
                      }).catch(err=>{
                        console.log(err);
                      });
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
              
                  //keep track of sent requests
                  let obj={user_data:allUsers,event_name:event_name,event_id:_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
                  _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(_id).set(obj).then(()=>{
                    console.log("Successfully Added BookingStatus");
                  }).catch(err=>{
                    console.log(err);
                  })
    
                  _this.snackBar.open("Successfully Updated","OK", {
                    duration: 3000,
                  });
                }).catch(err=>{
                  console.log(err);
                  _this.isCreating=false;
                  _this.snackBar.open("Error Updating","Try Again", {
                    duration: 3000,
                  });
                }).catch(err=>{
                  _this.isCreating=false
                  _this.snackBar.open("Error Updating","Try Again", {
                    duration: 3000,
                  });
                })
              });
        }).catch(err=>{
          _this.isCreating=false;
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        });
      }

      //removed the image
      else if(this.isRemovedImage && this.videoFile){
        storageRef.put(this.videoFile.item(0)).then(snapshot=>{
          storageRef.getDownloadURL().subscribe(url=>{ 
                let obj={event_name:event_name,date:date_string,time:time,event_id:_id,image_path:null,video_path:url,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
                _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(_id).set(obj).then(()=>{
                  console.log("Successfully Updated");
                  _this.isCreating=false;
    
                  let date=new Date();
                  let allUsers:any=[];
                  let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
              
                  //send requests for artists
                  for(var i=0;i<artist.length;i++){
                    let obj={user:artist[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=artist[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(artist[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to suppliers
                  for(var i=0;i<supplier.length;i++){
                    let obj={user:supplier[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=supplier[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(supplier[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to venues
                  for(var i=0;i<venue.length;i++){
                    let obj={user:venue[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=venue[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(venue[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                        console.log("Successfully Sent");
                      }).catch(err=>{
                        console.log(err);
                      });
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
              
                  //keep track of sent requests
                  let obj={user_data:allUsers,event_name:event_name,event_id:_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
                  _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(_id).set(obj).then(()=>{
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
                  _this.snackBar.open("Error Updating","Try Again", {
                    duration: 3000,
                  });
                }).catch(err=>{
                  _this.isCreating=false
                  _this.snackBar.open("Error Updating","Try Again", {
                    duration: 3000,
                  });
                });
              })
        }).catch(err=>{
          _this.isCreating=false;
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        });
      }

      //image removed and video not changed
      else if(this.isRemovedImage && !this.videoFile){
        let obj={event_name:event_name,date:date_string,time:time,event_id:_id,image_path:null,video_path:this.videoUrl,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
        _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(_id).set(obj).then(()=>{
          console.log("Successfully Updated");
          _this.isCreating=false;
  
          let date=new Date();
          let allUsers:any=[];
          let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
      
          //send requests for artists
          for(var i=0;i<artist.length;i++){
            let obj={user:artist[i],status:"Pending"};
            allUsers.push(obj);
            let email=artist[i].email;
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(artist[i].email).collection('bookings').get().then(doc=>{
              if(!doc.empty) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                console.log("Successfully Sent");
              }).catch(err=>{
                console.log(err);
              });
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
          //send requests to suppliers
          for(var i=0;i<supplier.length;i++){
            let obj={user:supplier[i],status:"Pending"};
            allUsers.push(obj);
            let email=supplier[i].email;
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(supplier[i].email).collection('bookings').get().then(doc=>{
              if(!doc.empty) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                console.log("Successfully Sent");
              }).catch(err=>{
                console.log(err);
              });
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
          //send requests to venues
          for(var i=0;i<venue.length;i++){
            let obj={user:venue[i],status:"Pending"};
            allUsers.push(obj);
            let email=venue[i].email;
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(venue[i].email).collection('bookings').get().then(doc=>{
              if(!doc.empty) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                console.log("Successfully Sent");
              }).catch(err=>{
                console.log(err);
              });
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
      
          //keep track of sent requests
          let obj={user_data:allUsers,event_name:event_name,event_id:_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
          _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(_id).set(obj).then(()=>{
            console.log("Successfully Added BookingStatus");
          }).catch(err=>{
            console.log(err);
          })
  
          _this.snackBar.open("Successfully Updated","OK", {
            duration: 3000,
          });
        }).catch(err=>{
          console.log(err);
          _this.isCreating=false;
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        }).catch(err=>{
          _this.isCreating=false
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        });
      }

      //video removed and image not changed
      else if(this.isRemovedVideo && !this.imageFile){
        let obj={event_name:event_name,date:date_string,time:time,event_id:_id,image_path:this.imageUrl,video_path:null,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
        _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(_id).set(obj).then(()=>{
          console.log("Successfully Updated");
          _this.isCreating=false;
  
          let date=new Date();
          let allUsers:any=[];
          let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
      
          //send requests for artists
          for(var i=0;i<artist.length;i++){
            let obj={user:artist[i],status:"Pending"};
            allUsers.push(obj);
            let email=artist[i].email;
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(artist[i].email).collection('bookings').doc(_id).get().then(doc=>{
              if(!doc.exists){
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
          //send requests to suppliers
          for(var i=0;i<supplier.length;i++){
            let obj={user:supplier[i],status:"Pending"};
            allUsers.push(obj);
            let email=supplier[i].email;
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(supplier[i].email).collection('bookings').get().then(doc=>{
              if(!doc.empty) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                console.log("Successfully Sent");
              }).catch(err=>{
                console.log(err);
              });
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
          //send requests to venues
          for(var i=0;i<venue.length;i++){
            let obj={user:venue[i],status:"Pending"};
            allUsers.push(obj);
            let email=venue[i].email;
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(venue[i].email).collection('bookings').doc(_id).get().then(doc=>{
              if(!doc.exists){
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
      
          //keep track of sent requests
          let obj={user_data:allUsers,event_name:event_name,event_id:_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
          _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(_id).set(obj).then(()=>{
            console.log("Successfully Added BookingStatus");
          }).catch(err=>{
            console.log(err);
          })
  
          _this.snackBar.open("Successfully Updated","OK", {
            duration: 3000,
          });
        }).catch(err=>{
          console.log(err);
          _this.isCreating=false;
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        }).catch(err=>{
          _this.isCreating=false
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        });
      }

      //removed image and video
      else if(this.isRemovedImage && this.isRemovedVideo){
        let obj={event_name:event_name,date:date_string,time:time,event_id:_id,image_path:null,video_path:null,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
        _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(_id).set(obj).then(()=>{
          console.log("Successfully Updated");
          _this.isCreating=false;
  
          let date=new Date();
          let allUsers:any=[];
          let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
      
          //send requests for artists
          for(var i=0;i<artist.length;i++){
            let obj={user:artist[i],status:"Pending"};
            allUsers.push(obj);
            let email=artist[i].email;
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(artist[i].email).collection('bookings').doc(_id).get().then(doc=>{
              if(!doc.exists) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                console.log("Successfully Sent");
              }).catch(err=>{
                console.log(err);
              });
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
          //send requests to suppliers
          for(var i=0;i<supplier.length;i++){
            let obj={user:supplier[i],status:"Pending"};
            allUsers.push(obj);
            let email=supplier[i].email;
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(supplier[i].email).collection('bookings').doc(_id).get().then(doc=>{
              if(!doc.exists) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                console.log("Successfully Sent");
              }).catch(err=>{
                console.log(err);
              });
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
          //send requests to venues
          for(var i=0;i<venue.length;i++){
            let obj={user:venue[i],status:"Pending"};
            allUsers.push(obj);
            let email=venue[i].email;
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(venue[i].email).collection('bookings').doc(_id).get().then(doc=>{
              if(!doc.exists) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                console.log("Successfully Sent");
              }).catch(err=>{
                console.log(err);
              });
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
      
          //keep track of sent requests
          let obj={user_data:allUsers,event_name:event_name,event_id:_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
          
          _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(_id).set(obj).then(()=>{
            console.log("Successfully Added BookingStatus");
          }).catch(err=>{
            console.log(err);
          })
  
          _this.snackBar.open("Successfully Updated","OK", {
            duration: 3000,
          });
        }).catch(err=>{
          console.log(err);
          _this.isCreating=false;
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        }).catch(err=>{
          _this.isCreating=false
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        });
      }
    }

    //if not deleted
    else if(!this.isRemovedImage && !this.isRemovedVideo){
      // alert("2")
      if(this.videoFile && this.imageFile){
        storageRef.put(this.imageFile.item(0)).then(snapshot=>{
          storageRef.getDownloadURL().subscribe(url=>{
            console.log(video);
            storageVideoRef.put(video).then(snapshot=>{
              storageVideoRef.getDownloadURL().subscribe(url1=>{
                let obj={event_name:event_name,date:date_string,time:time,event_id:_id,image_path:url,video_path:url1,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
                _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(_id).set(obj).then(()=>{
                  console.log("Successfully Updated");
                  _this.isCreating=false;
    
                  let date=new Date();
                  let allUsers:any=[];
                  let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
              
                  //send requests for artists
                  for(var i=0;i<artist.length;i++){
                    let obj={user:artist[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=artist[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(artist[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                        console.log("Successfully Sent");
                      }).catch(err=>{
                        console.log(err);
                      });
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to suppliers
                  for(var i=0;i<supplier.length;i++){
                    let obj={user:supplier[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=supplier[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(supplier[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists) _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                        console.log("Successfully Sent");
                      }).catch(err=>{
                        console.log(err);
                      });
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to venues
                  for(var i=0;i<venue.length;i++){
                    let obj={user:venue[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=venue[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(venue[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
              
                  //keep track of sent requests
                  let obj={user_data:allUsers,event_name:event_name,event_id:_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
                  _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(_id).set(obj).then(()=>{
                    console.log("Successfully Added BookingStatus");
                  }).catch(err=>{
                    console.log(err);
                  })
    
                  _this.snackBar.open("Successfully Updated","OK", {
                    duration: 3000,
                  });
                }).catch(err=>{
                  console.log(err);
                  _this.isCreating=false;
                  _this.snackBar.open("Error Updating","Try Again", {
                    duration: 3000,
                  });
                }).catch(err=>{
                  _this.isCreating=false
                  _this.snackBar.open("Error Updating","Try Again", {
                    duration: 3000,
                  });
                })
              })
            }).catch(err=>{
              _this.isCreating=false;
              _this.snackBar.open("Error Updating","Try Again", {
                duration: 3000,
              });
            })
          })
        }).catch(err=>{
          _this.isCreating=false;
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        });
      }
      else if(this.imageFile && !this.videoFile){
        storageRef.put(this.imageFile.item(0)).then(snapshot=>{
          storageRef.getDownloadURL().subscribe(url=>{
                let obj={event_name:event_name,date:date_string,time:time,event_id:_id,image_path:url,video_path:this.videoUrl,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
                _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(_id).set(obj).then(()=>{
                  console.log("Successfully Updated");
                  _this.isCreating=false;
    
                  let date=new Date();
                  let allUsers:any=[];
                  let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
              
                  //send requests for artists
                  for(var i=0;i<artist.length;i++){
                    let obj={user:artist[i],status:"Pending"};
                    let email=artist[i].email;
                    allUsers.push(obj);
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(artist[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        alert(email)
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to suppliers
                  for(var i=0;i<supplier.length;i++){
                    let obj={user:supplier[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=supplier[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(supplier[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to venues
                  for(var i=0;i<venue.length;i++){
                    let obj={user:venue[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=venue[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(venue[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
              
                  //keep track of sent requests
                  let obj={user_data:allUsers,event_name:event_name,event_id:_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
                  _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(_id).set(obj).then(()=>{
                    console.log("Successfully Added BookingStatus");
                  }).catch(err=>{
                    console.log(err);
                  })
    
                  _this.snackBar.open("Successfully Updated","OK", {
                    duration: 3000,
                  });
                }).catch(err=>{
                  console.log(err);
                  _this.isCreating=false;
                  _this.snackBar.open("Error Updating","Try Again", {
                    duration: 3000,
                  });
                }).catch(err=>{
                  _this.isCreating=false
                  _this.snackBar.open("Error Updating","Try Again", {
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
                let obj={event_name:event_name,date:date_string,time:time,event_id:_id,image_path:this.imageUrl,video_path:url,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
                _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(_id).set(obj).then(()=>{
                  console.log("Successfully Updated");
                  _this.isCreating=false;
    
                  let date=new Date();
                  let allUsers:any=[];
                  let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
              
                  //send requests for artists
                  for(var i=0;i<artist.length;i++){
                    let obj={user:artist[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=artist[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(artist[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to suppliers
                  for(var i=0;i<supplier.length;i++){
                    let obj={user:supplier[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=supplier[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(supplier[i].email).collection('bookings').doc(_id).get().then(doc=>{
                      if(!doc.exists){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
                  //send requests to venues
                  for(var i=0;i<venue.length;i++){
                    let obj={user:venue[i],status:"Pending"};
                    allUsers.push(obj);
                    let email=venue[i].email;
                    let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
                    _this.database.firestore.collection('register_user').doc(venue[i].email).collection('bookings').get().then(doc=>{
                      if(!doc.empty){
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                      else{
                        let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                        _this.database.collection('register_user').doc(email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                          console.log("Successfully Sent");
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }).catch(err=>{
                      console.log(err);
                    })
                  }
              
              
                  //keep track of sent requests
                  let obj={user_data:allUsers,event_name:event_name,event_id:_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
                  _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(_id).set(obj).then(()=>{
                    console.log("Successfully Added BookingStatus");
                  }).catch(err=>{
                    console.log(err);
                  })
    
                  _this.snackBar.open("Successfully Updated","OK", {
                    duration: 3000,
                  });
                }).catch(err=>{
                  console.log(err);
                  _this.isCreating=false;
                  _this.snackBar.open("Error Updating","Try Again", {
                    duration: 3000,
                  });
                }).catch(err=>{
                  _this.isCreating=false
                  _this.snackBar.open("Error Updating","Try Again", {
                    duration: 3000,
                  });
                });
              })
        }).catch(err=>{
          _this.isCreating=false;
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        });
      }
      else{
        let obj={event_name:event_name,date:date_string,time:time,event_id:_id,image_path:this.imageUrl,video_path:this.videoUrl,user_name:localStorage.getItem('user_name'),artists:artist,suppliers:supplier,venue_owners:venue};
        _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(_id).set(obj).then(()=>{
          console.log("Successfully Updated");
          _this.isCreating=false;
  
          let date=new Date();
          let allUsers:any=[];
          let date_string=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
      
          //send requests for artists
          for(var i=0;i<artist.length;i++){
           
            let obj={user:artist[i],status:"Pending"};
            let artist_email=artist[i].email;
            allUsers.push(obj);
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:artist[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(artist[i].email).collection('bookings').doc(_id).get().then(doc=>{
              if(!doc.exists){
                _this.database.collection('register_user').doc(artist_email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                console.log(artist_email)
                _this.database.collection('register_user').doc(artist_email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
          //send requests to suppliers
          for(var i=0;i<supplier.length;i++){
            let obj={user:supplier[i],status:"Pending"};
            let sup_email=supplier[i].email;
            allUsers.push(obj);
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:supplier[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(supplier[i].email).collection('bookings').doc(_id).get().then(doc=>{
              if(!doc.exists){
                _this.database.collection('register_user').doc(sup_email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(sup_email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
          //send requests to venues
          for(var i=0;i<venue.length;i++){
            let obj={user:venue[i],status:"Pending"};
            let ven_email=venue[i].email;
            allUsers.push(obj);
            let booking_request={event_name:event_name,event_id:_id,sender_name:localStorage.getItem('nameId'),sender_email:localStorage.getItem('user_name'),receiver_email:venue[i].email,date:date_string,view:false,status:"Pending",time:time,venue:venue};
            _this.database.firestore.collection('register_user').doc(venue[i].email).collection('bookings').doc(_id).get().then(doc=>{
              if(!doc.exists){
                _this.database.collection('register_user').doc(ven_email).collection('bookings').doc(_id).set(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
              else{
                let booking_request={event_name:event_name,date:date_string,time:time,venue:venue};
                _this.database.collection('register_user').doc(ven_email).collection('bookings').doc(_id).update(booking_request).then(()=>{
                  console.log("Successfully Sent");
                }).catch(err=>{
                  console.log(err);
                });
              }
            }).catch(err=>{
              console.log(err);
            })
          }
      
      
          //keep track of sent requests
          let obj={user_data:allUsers,event_name:event_name,event_id:_id,date:(today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate())};
          _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('BookingStatus').doc(_id).set(obj).then(()=>{
            console.log("Successfully Added BookingStatus");
          }).catch(err=>{
            console.log(err);
          })
  
          _this.snackBar.open("Successfully Updated","OK", {
            duration: 3000,
          });
        }).catch(err=>{
          console.log(err);
          _this.isCreating=false;
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        }).catch(err=>{
          _this.isCreating=false
          _this.snackBar.open("Error Updating","Try Again", {
            duration: 3000,
          });
        });
      }
    }

    //this.sendBookingReq();
    this.reset();
  }


  //reset form
  reset(){
    this.form.reset();
    // let image=document.getElementById('image') as HTMLElement;
    // image.setAttribute('src','');
    // let video=document.getElementById('myVideo') as HTMLElement;
    // video.setAttribute('src','');
    // (<HTMLInputElement>document.getElementById('imgInput')).value="";
    // (<HTMLInputElement>document.getElementById('videoInp')).value="";
    this.selected_venue=[];
    this.selected_artists=[];
    this.selected_suppliers=[];
    this.supplierList=[];
    this.artistList=[];
    this.venue_ownerList=[];
    // this.removeImage();
    // this.removeVideo();
    this.loadEvent(this.eventId);
  }

  //load update events
  loadEvent(id:any){
    var _this=this;
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('MyEvents').doc(id).get().then(docs=>{
      if(!docs.exists) console.log("Empty Data");
      else{
        _this.isLoaded=true;
        _this.selected_artists=docs.data().artists;
        _this.selected_suppliers=docs.data().suppliers;
        _this.selected_venue=docs.data().venue_owners;
        _this.imageUrl=docs.data().image_path;
        _this.videoUrl=docs.data().video_path;
        //alert(_this.videoUrl);
        console.log(new Date(docs.data().date))
      }
      _this.form=new FormGroup({
        event_name:new FormControl(docs.data().event_name,[Validators.required]),
        date:new FormControl(new Date(docs.data().date),[Validators.required]),
        time:new FormControl(docs.data().time,[Validators.required]),
      })
    })
  }

    //remove artist
    removeArtist(email:any){
      alert("Please cancel the request you sent if you do not require this user");
      this.selected_artists=this.selected_artists.filter(x=>x.email!==email);
    }
  
    //remove supplier
    removeSupplier(email:string){
      alert("Please cancel the request you sent if you do not require this user");
      this.selected_suppliers=this.selected_suppliers.filter(x=>x.email!==email);
    }
  
    //remove venue
    removeVenue(email:string){
      alert("Please cancel the request you sent if you do not require this user");
      this.selected_venue=this.selected_venue.filter(x=>x.email!==email);
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

    //load artist
    loadArtist(event){
      event.preventDefault();
      console.log(this.selected_artists.some(x=>x.email==='benuraab@gmail.com'));
      this.artistList=[];
      this.prefferedRole="artist";
      var _this=this;
      this.database.firestore.collection('register_user').get().then(docs=>{
        if(docs.empty) console.log("Empty users");
        else{
          docs.forEach(doc=>{
            if(doc.data().role==='artist') _this.artistList.push(doc.data());
          })
        }
      })
    }
  
    //load suppliers
    loadSuppliers(event){
      event.preventDefault();
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
    loadVenues(event){
      event.preventDefault();
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
      });
    }

      //upload images
  uploadImage(event:any){
    this.isRemovedImage=false;
    event.preventDefault();
    upload_images();
  }


  //upload videos
  uploadVideo(event:any){
    this.isRemovedVideo=false;
    event.preventDefault();
    upload_video();
  }


  //remove images
  removeImage(){
    this.isRemovedImage=true;
    delete_image();
  }


  //remove videos
  removeVideo(){
    this.isRemovedVideo=true;
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

}
