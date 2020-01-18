import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Upload } from 'app/Modules/upload';
import * as firebase from 'firebase/app';
import { AngularFireList } from 'angularfire2/database';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';


@Injectable({         //There's a difference here
  providedIn: 'root'
})
export class UploadService {

  urll: any;

  constructor(
    public db: AngularFirestore
  ) { }

  private basePath: string = '/uploads';
  uploads: AngularFireList<Upload[]>;

  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        // upload.url = uploadTask.snapshot.downloadURL
        // upload.name = upload.file.name
        // console.log("download url - "+upload.url);
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
          this.db.collection('uploadz').add({ downloadURL:this.downloadURL})
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
          // this.urll = downloadURL;
          // this.db.collection('uploadz').add({
          //   download_url: downloadURL
          // });
          // this.saveFileData(downloadURL);

        });
        // saveFileData(this.urll)
      }
    );
  }


  // Writes the file details to the realtime db
  public saveFileData(urlz: any) {
    this.db.collection("uploadz").doc("LA").set({
      download_url: urlz
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    // this.db.collection('uploadz').add({
    //   download_url: urlz
    // });
  }
}
