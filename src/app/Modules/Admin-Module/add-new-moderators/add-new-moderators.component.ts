import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import CryptoJS from 'crypto-js';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { SendMailService } from 'app/services/sendEmail.service';
import {redirect_to_login} from '../../../../scripts/signup_validation';
@Component({
  selector: 'app-add-new-moderators',
  templateUrl: './add-new-moderators.component.html',
  styleUrls: ['./add-new-moderators.component.scss']
})
export class AddNewModeratorsComponent implements OnInit {
  form: any;
  isError:boolean=false;
  success:boolean=false;
  count:number=0;
  isExist:boolean=false;
  user_array:any=[];
  priviledges:any=[];
  constructor(private firebaseAuth:AngularFireAuth,private db:AngularFirestore,private sendMail:SendMailService) { }

  ngOnInit() {
    this.form=new FormGroup({
      user_name:new FormControl('',Validators.required),
      contact:new FormControl('',Validators.required),
      f_name:new FormControl('',Validators.required),
      l_name:new FormControl('',[Validators.required]),
      country:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required])
    });  

    this.getUsers();
    this.getPriviledges();
  }

  //error handelling 
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  //get users
  getUsers(){
    this.user_array=[];
    var _this=this;
    this.db.firestore.collection('register_user').get().then(docs=>{
      if(docs.empty) _this.isExist=false;
      else{
        docs.forEach(doc=>{
          _this.user_array.push(doc.data());
        })
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  //get moderator priviledges
  getPriviledges(){
    var _this=this;
    this.priviledges=[];
    this.db.firestore.collection('moderator_priviledges').doc('priviledges').get().then(docs=>{
      if(!docs.exists) console.log("Empty");
      else{
        _this.priviledges.push(docs.data());
        console.log(docs.data())
      }
      
    }).catch(err=>{
      console.log(err);
    })
  }
  //create moderator
  createModerator(){
    var _this=this;
    let screen_name=this.form.get('user_name').value;
    let user_name=this.form.get('f_name').value+" "+this.form.get('l_name').value;
    let email=this.form.get('email').value;
    let contact=this.form.get('contact').value;
    let hashed_password= CryptoJS.SHA256(this.form.get('password').value).toString();

    let key=this.generateKey(email);
    let obj={screen_name:screen_name,user_name:user_name,contact:contact,password:hashed_password,email:email,id:key.toString(),role:'moderator',active_status:"logout"};

    //add moderator

    this.user_array=this.user_array.filter(x=> x.email===email || (x.role==='moderator' && x.id===key));
    //alert(this.user_array.length);
    if(this.user_array.length>0) this.isExist=true;
    else this.isExist=false;

    if(!_this.isExist){
      _this.db.collection('register_user').doc(email).set(obj).then(()=>{
        console.log("Successfully Added");

    //send mail
    const email_message_to_reporter={
      to: email,
      from:'eventCorp@gmail.com',
      subject: "Work As a moderator in EventCorp",
      text: _this.getMessage(key.toString()),
      html: '<strong>'+_this.getMessage(key.toString())+'</strong>',
    }

    //send mail to reporter
    try{
      _this.sendMail.sendEmail(email_message_to_reporter).subscribe((data)=>{
      var _returnedData:any=data;
      if(_returnedData.success===true){
          console.log("Sent to the reporter");
          _this.success=true;
         // redirect_to_login();
      }
      else{
          console.log("Error sending mail");
           _this.isError=true;
           _this.success=false;
          }
      })
    }
    catch(err){
        console.log(err);
        _this.isError=true;
        _this.success=false;
    }
      }).catch(err=>{
        console.log(err);
      })

      this.reset();
    }
    else alert("Moderator already exists!");
  
    // //create new user
    // this.firebaseAuth.auth.createUserWithEmailAndPassword(email,hashed_password).then(value=>{
    //   var hash_link=CryptoJS.SHA256(value.user.uid).toString()+"?email"+CryptoJS.SHA256(email).toString()+"&&password"+hashed_password;
    //   let _link="http://localhost:4200/email-verify/"+hash_link;
    //   value.user.updateProfile({displayName:user_name});
    //   localStorage.setItem('signedUpEmail',email);

    //   //update to database
    //   let obj={address1:null,address2:null,state_sel:"Colombo",user_name:user_name,screen_name:screen_name,email:email,contact:contact,password:hashed_password,verification:false,remember_me:false,image_url:"assets/img/faces/pro_img.png",active_status:"logout",role:"moderator",city:"colombo",country_code:"lk",profile_status:"Active",uId:value.user.uid,verification_link:_link,view_signup_notification:false};
    //   _this.db.collection('register_user').doc(email).set(obj).then(()=>{
    //     console.log("Success");

    //     //send mail
    //     const email_message_to_reporter={
    //       to: email,
    //       from:'eventCorp@gmail.com',
    //       subject: "Verify Your Email",
    //       text: _this.getMessage(_link),
    //       html: '<strong>'+_this.getMessage(_link)+'</strong>',
    //     }

    //     //send mail to reporter
    //     try{
    //         _this.sendMail.sendEmail(email_message_to_reporter).subscribe((data)=>{
    //         var _returnedData:any=data;
    //         if(_returnedData.success===true){
    //             console.log("Sent to the reporter");
    //             _this.success=true;
    //             redirect_to_login();
    //         }
    //         else{
    //             console.log("Error sending mail");
    //              _this.isError=true;
    //              _this.success=false;
    //             }
    //         })
    //       }catch(err){
    //           console.log(err);
    //           _this.isError=true;
    //           _this.success=false;
    //         }
    //     }).catch(err=>{
    //       console.log(err);
    //   })
    // })

    //reset form
    //this.form.reset();

  }


  //generate moderator key
  generateKey(email){
    this.count=0;
    // let contacts=contact.toString();
    // let screen_name_length=screen_name.length;
    // let user_name_length=user_name.length;
    // let password=this.form.get('password').value;
    let email_length=email.length;
   // alert(length_contact+" "+screen_name+" "+user_name_length+" "+password.length)

   for(var i=0;i<email_length;i++){
     this.count+=(Math.ceil(email.charCodeAt(i)*Math.pow(10,i)));
     //alert(this.count)
   }

   let count_string=this.count.toString();
   var beg=Math.ceil(count_string.length/2)-2;

   let sub_id=count_string.substr(beg,6);

    // for(var i=0;i<contacts.length;i++){
    //   this.count+=parseInt(contacts[i]);
    // }

    // for(var i=0;i<screen_name_length;i++){
    //   this.count+=screen_name.charCodeAt(i);
    // }

    // for(var i=0;i<user_name_length;i++){
    //   this.count+=user_name.charCodeAt(i);
    // }

    // for(var i=0;i<password.length;i++){
    //   this.count+=password.charCodeAt(i);
    // }

    // for(var i=0;i<email_length;i++){
    //   this.count+=email.charCodeAt(i);
    // }

    // alert(this.count)
    // let total_length=contacts.length+screen_name_length+user_name_length+password.length;
    // alert(total_length);
    // let key=Math.ceil((Math.pow(this.count, total_length)));
    let key=sub_id
    // alert(key);
    // key=key%10000;
    return key;
  }

//generate message
getMessage(id){
  let message="<html><head><title></title></head><body>"+"Your account has been created by "+localStorage.getItem("nameId")+".To Login to the system please use the following credentials"+"<br><hr>"+"<b>ID :</b>"+id+"<br>"+"Password :"+this.form.get('password').value+"<br><br>"+"<b> Best Regards</b> <br> EventCorp Team";
  return message;
}

//reset form
reset(){
  (<HTMLInputElement>document.getElementById('email')).value="";
  (<HTMLInputElement>document.getElementById('user_name')).value="";
  (<HTMLInputElement>document.getElementById('f_name')).value="";
  (<HTMLInputElement>document.getElementById('l_name')).value="";
  (<HTMLInputElement>document.getElementById('contact')).value="";
  (<HTMLInputElement>document.getElementById('country')).value="";
  (<HTMLInputElement>document.getElementById('password')).value="";

}


//edit priviledges
addPriviledge(type:string){
  var _this=this;
  if(type==='delete_comments'){
    this.db.collection('moderator_priviledges').doc('priviledges').update({delete_comments:true}).then(()=>{
      _this.getPriviledges();
    }).catch(err=>{
      alert("Error updating!");
    })
  }
  else if(type==='user_requests'){
    this.db.collection('moderator_priviledges').doc('priviledges').update({user_requests:true}).then(()=>{
      _this.getPriviledges();
    }).catch(err=>{
      alert("Error Updating!");
    })
  }
  else if(type==='view_details'){
    this.db.collection('moderator_priviledges').doc('priviledges').update({view_details:true}).then(()=>{
      _this.getPriviledges();
    }).catch(err=>{
      alert("Error Updating!");
    })
  }
  else if(type==='edit_content'){
    this.db.collection('moderator_priviledges').doc('priviledges').update({edit_content:true}).then(()=>{
      _this.getPriviledges();
    }).catch(err=>{
      alert("Error Updating!");
    })
  }
 
}


//remove priviledges
removePriviledges(type:string){
  var _this=this;
  if(type==='delete_comments'){
    this.db.collection('register_user').doc('priviledges').update({delete_comments:false}).then(()=>{
      _this.getPriviledges();
    }).catch(err=>{
      alert("Error Updating!");
    })
  }
  else if(type==='user_requests'){
    this.db.collection('register_user').doc('priviledges').update({user_requests:false}).then(()=>{
      _this.getPriviledges();
    }).catch(err=>{
      alert("Error Updating!");
    })
  }
  else if(type==='view_details'){
    this.db.collection('register_user').doc('priviledges').update({view_details:false}).then(()=>{
      _this.getPriviledges();
    }).catch(err=>{
      alert("Error Updating!");
    })
  }
  else if(type==='edit_content'){
    this.db.collection('register_user').doc('priviledges').update({edit_content:false}).then(()=>{
      _this.getPriviledges();
    }).catch(err=>{
      alert("Error Updating!");
    })
  }
}

}
