// Firebase App (the core Firebase SDK) is always required and

//require("firebase/firestore");

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
 
  auth().createUserWithEmailAndPassword("benuraab@gmail.com", "benura").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode,"+","errorMessage");
    // ...
  });

 /* firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
  */

  var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
} else {
  // No user is signed in.
}