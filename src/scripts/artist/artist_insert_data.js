const firebaseInit=require('./../firebase-authentication/firebase');

//initialize firebase
var firebase=firebaseInit.firebaseInit();
var database=firebase.firestore();

exports.insertBio=function(data){

    //create documnets and collections
    var artist_bio=database.collection('Artist-Bio').doc('benuraab@gmail.com').set(data[0]);
    artist_bio.then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
}

exports.insertArtstInfo=function(data){

    var artist_info=database.collection('Artist-Info').doc('benuraab@gmail.com').set(data);
    artist_info.then(function(docRef) {
        console.log("Document written with ID: ",docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

}

exports.insertAlbumData=function(data){


    var album_data=database.collection('Album-Data').doc('benuraab@gmail.com').set(data);
    album_data.then(function(docRef) {
        console.log("Document written with ID: ",docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

exports.insertArtistCalendar=function(data){

    var artist_calendar=database.collection('Artist-Calendar').doc('benuraab@gmail.com').set(data);
    artist_calendar.then(function(docRef) {
        console.log("Document written with ID: ",docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

