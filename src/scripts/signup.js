// const firebaseInit=require('./firebase-authentication/firebase');

// //initialize firebase
// var firebase=firebaseInit.firebaseInit();
// var database=firebase.firestore();

exports.signup=function(data,database){

    var user_email=data.email;
    console.log(database+'database')
    console.log(data)
    var user_signup=database.collection('register_user').doc(user_email).set(data);

    if(user_signup) return 1;
    else return 0;   
    
    
}