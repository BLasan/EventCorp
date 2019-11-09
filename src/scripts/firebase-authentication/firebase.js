var firebase = require("firebase/app");

exports.firebaseInit=function(a=0){

const functions = require('firebase/functions');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA95SG6_4tkcDHDySiuQfVt9cbm_kyUwhk",
  authDomain: "eventcorppro.firebaseapp.com",
  databaseURL: "https://eventcorppro.firebaseio.com",
  projectId: "eventcorppro",
  storageBucket: "eventcorppro.appspot.com",
  messagingSenderId: "886719532814",
  appId: "1:886719532814:web:9424058ace3d13af"
};


// Initialize Firebase
if(a==0)
firebase.initializeApp(firebaseConfig);

if(a==10){
  firebase.initializeApp(firebaseConfig);
  return firebase.firestore();
}

     return firebase;
}


//exports.database_firestore=this.firebaseInit();
