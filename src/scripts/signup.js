const firebaseInit=require('./firebase-authentication/firebase');

//initialize firebase
var firebase=firebaseInit.firebaseInit();
var database=firebase.firestore();

exports.signup=function(data){

    var user_email=data.email;
    console.log(database+'database')
    console.log(data)
    var user_signup=database.collection('register_user').doc(user_email).set(data);
    user_signup.then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
}