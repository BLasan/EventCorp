import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { add_item_image,item_uploader_remove} from '../../../../scripts/image_uploader';
import { disable_item_image_uploader} from '../../../../scripts/disable_a_href';
@Component({
  selector: 'app-supplier-add-items',
  templateUrl: './supplier-add-items.component.html',
  styleUrls: ['./supplier-add-items.component.scss']
})
export class SupplierAddItemsComponent implements OnInit {

  form:any;
  image_file:FileList;
  constructor(private database:AngularFirestore,private storage:AngularFireStorage) { }

  ngOnInit() {
    disable_item_image_uploader();
    this.form=new FormGroup({
      item_name:new FormControl('',Validators.required),
      price:new FormControl('',[Validators.required]),
      quantity:new FormControl('',Validators.required),
      // code:new FormControl([{value:'',disabled:true}],Validators.required),
      description:new FormControl('',Validators.required),
      item_image:new FormControl('',Validators.required)
    });  
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  onSubmit(){
    var _this=this;
    let item_name=this.form.get('item_name').value;
    let price=this.form.get('price').value;
    let quantity=this.form.get('quantity').value;
    // let code=this.form.get('code').value;
    let code="";
    let image_file=this.image_file[0];
    let description=this.form.get('description').value;
    let date=new Date();
    let code_init=item_name.substr(0,2);
    console.log(code_init)
    let count=0;
    console.log(_this.image_file[0])
    this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').get().then(doc=>{
      if(doc.empty){
        count++;
      } 
      else{
        doc.forEach(docs=>{
          if(docs.id.substr(0,2)===code_init) count++;
        });

        if(count>0 && count<10) code=code_init+"00"+count;
        else if(count>=10 && count<100) code=code_init+"0"+count;
        else if(count>=100) code=code_init+count;
        let image_id="supplier-items/"+localStorage.getItem('user_name')+"/"+date.getTime().toString();
        let storageRef=_this.storage.ref(image_id);
        console.log(image_file)
        storageRef.put(image_file).then(function(snapshot){
          storageRef.getDownloadURL().subscribe(url=>{
            var item_details={image_url:url,item_name:item_name,price:price,quantity:quantity,code:code,description:description,date:date};
            _this.database.firestore.collection('register_user').doc(localStorage.getItem('user_name')).collection('our_items').doc(code).set(item_details).then(doc=>{
              item_uploader_remove();
            }).catch(err=>{
              console.log(err);
            }) 
            });
          });
        console.log(code+" Code");
      }
    }).catch(err=>{
      console.log(err);
    })
    //let data_obj={item_name:item_name,price:price,quantity:quantity,code:code,description:description,date:date};
      this.form.reset();
  }

  get_uploaded_image(event){
    this.image_file=event.target.files;
    console.log(this.image_file);
    document.getElementById('file_name').innerHTML=this.image_file[0].name;
  }

  upload_image(){
    add_item_image();
  }

  remove_image(){
    item_uploader_remove();
  }

  reset_form(){
    (<HTMLInputElement>document.getElementById('item_name')).value="";
    (<HTMLInputElement>document.getElementById('code')).value="";
    (<HTMLInputElement>document.getElementById('quantity')).value="";
    (<HTMLInputElement>document.getElementById('price')).value="";
    (<HTMLInputElement>document.getElementById('description')).value="";  
  }

  load_item_counts(){

  }

}
