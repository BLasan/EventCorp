exports.firebaseInit=function(){
var firebase = require("firebase/app");
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
firebase.initializeApp(firebaseConfig);


firebase.auth().createUserWithEmailAndPassword("benuraab@gmail.com","benura").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(errorCode,"+",errorMessage);
  // ...
});


var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:4200',
  // This must be true.
  handleCodeInApp: true,
  
};


// firebase.auth().sendSignInLinkToEmail("benuraab@gmail.com",actionCodeSettings)
//   .then(function() {
//     console.log('sent')
//     // The link was successfully sent. Inform the user.
//     // Save the email locally so you don't need to ask the user for it again
//     // if they open the link on the same device.
//    // window.localStorage.setItem('emailForSignIn', email);
//   })
//   .catch(function(error) {
//     console.log('Error')
//     // Some error occurred, you can inspect the code: error.code
//   });

     return firebase;
}
