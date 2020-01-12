import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { add_item_image,item_uploader_remove} from '../../../../scripts/image_uploader';
import { disable_item_image_uploader} from '../../../../scripts/disable_a_href';
import { item_types } from '../../../../scripts/item_types.js';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {

  form:any;
  category:string;
  isEmpty:boolean=false;
  selection:string="";
  item_categories:any;
  image_file:FileList;
  _id:any;
  isLoaded:boolean=false;
  product_details:any=[];
  isUploaded:boolean=false;
  imageUrl:any;
  img_url_storage:any;
  constructor(private database:AngularFirestore,private route:ActivatedRoute,private storage:AngularFireStorage,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.item_categories=item_types;
    this.route.params.subscribe(params => {
      this.loadProduct(params.id);
      this._id=params.id;
   });
  }


  //load product
  loadProduct(id:any){
    var _this=this;
    let fileName:any;
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').doc(id).get().then(docs=>{
      if(!docs.exists) console.log("Empty Products");
      else{
        _this.product_details.push(docs.data());
        _this.selection=_this.item_categories.filter(x=>x.type_value===docs.data().item_type)[0].type_name;
        _this.imageUrl=docs.data().file_name;
        _this.img_url_storage=docs.data().image_url;
        _this.category=docs.data().item_type;
        //load form
        _this.form=new FormGroup({
          item_name:new FormControl(docs.data().item_name,Validators.required),
          price:new FormControl(docs.data().price,[Validators.required]),
          quantity:new FormControl(docs.data().quantity,Validators.required),
          description:new FormControl(docs.data().description,Validators.required),
          item_image:new FormControl('',Validators.required)
        });  
      }

      _this.isLoaded=true;
    }).catch(err=>{
      console.log(err);
    });
  }



  //done editing
  onSubmit(){
    var _this=this;
    let item_name=this.form.get('item_name').value;
    let price=this.form.get('price').value;
    let quantity=this.form.get('quantity').value;
    // let code=this.form.get('code').value;
    if(this.isUploaded)
    var image_file=this.image_file;
    let description=this.form.get('description').value;
    let date=new Date();

    //update the our items collection
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').get().then(doc=>{

      if(!doc.empty){
        let image_id="supplier-items/"+localStorage.getItem('user_name')+"/"+_this._id;

        console.log("Hello")
          //get image download url
          if(_this.isUploaded){
            let storageRef=_this.storage.ref(image_id);
            storageRef.put(image_file).then(snapshot=>{
              storageRef.getDownloadURL().subscribe(url=>{
                var item_details={image_url:url,item_name:item_name,item_type:_this.category,price:price,quantity:quantity,code:_this._id,description:description,date:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),file_name:image_file.item(0).name};
               _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').doc(_this._id).update(item_details).then(()=>{
                 console.log('Updated to database');
                 _this.snackBar.open("Successfully Updated!","OK", {
                  duration: 2000,
                }); 
               }).catch(err=>{
                this.snackBar.open("There were some errors in uploading.Try again!","OK", {
                  duration: 2000,
                }); 
                 console.log(err);
               })
              })
            }).catch(err=>{
              console.log("HjHHH");
              console.log(err);
            });
          }
          else{
            console.log(_this.imageUrl);
            var item_details={image_url:_this.img_url_storage,item_name:item_name,item_type:_this.category,price:price,quantity:quantity,code:_this._id,description:description,date:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),file_name:_this.imageUrl};
            console.log(item_details);
            _this.database.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').doc(_this._id).update(item_details).then(()=>{
              console.log('Added to database');
            }).catch(err=>{
              console.log("HHHHH");
              console.log(err);
            });
          }
      }
      });

    this.form.reset();        //reset form
    document.getElementById('file_name').innerHTML="";         //reset file name
}


  //error handelling
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }



  //get types of the products
  getType(event:any){
    this.category=event.value;
    if(event.value=='CH')  this.selection="Chair";
    else if(event.value=='TB')  this.selection="Table";
    else if(event.value=='MC')  this.selection="Musical Items";
    else if(event.value=='LT')  this.selection="Lights";

  }


  //get uploaded image to fileList
  get_uploaded_image(event){
    this.isUploaded=true;
    this.image_file=event.target.files;
    console.log(this.image_file);
    document.getElementById('file_name').innerHTML=this.image_file[0].name;  //update file name
  }

  upload_image(event:any){
    event.preventDefault();
    add_item_image();
  }

  remove_image(){
    item_uploader_remove();
    this.isUploaded=false;
  }

  reset_form(){
    (<HTMLInputElement>document.getElementById('item_name')).value="";
    (<HTMLInputElement>document.getElementById('code')).value="";
    (<HTMLInputElement>document.getElementById('quantity')).value="";
    (<HTMLInputElement>document.getElementById('price')).value="";
    (<HTMLInputElement>document.getElementById('description')).value="";  
  }


}
