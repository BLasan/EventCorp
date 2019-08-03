const firebaseInit=require('../../../firebase');
//initialize firebase
var firebase=firebaseInit.firebaseInit();
var database=firebase.firestore();

//getBioData
exports.getBioData=function(){

    var docRef = database.collection('Artist-Bio').doc('benuraab@gmail.com');

    docRef.get().then(async function(doc) {
        if (doc.exists) {
        console.log("Document data:", doc.data());
        // return await getData(doc.data());
        localStorage.setItem('getBioData', JSON.stringify(doc.data()));
             } 
          
        else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
         }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}

//getInfo
exports.getArtistInfo=function(){

    var docRef = database.collection('Artist-Info').doc('benuraab@gmail.com');

    docRef.get().then(async function(doc) {
        if (doc.exists) {
        console.log("Document data:", doc.data());
        // return await getData(doc.data());
        localStorage.setItem('getArtistInfo', JSON.stringify(doc.data()));
             } 
          
        else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
         }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


}

exports.getAlbumData=function(){

    var docRef = database.collection('Album-Data').doc('benuraab@gmail.com');

    docRef.get().then(async function(doc) {
        if (doc.exists) {
        console.log("Document data:", doc.data());
        // return await getData(doc.data());
        localStorage.setItem('getAlbumData', JSON.stringify(doc.data()));
             } 
          
        else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
         }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}

exports.getCalendarData=function(){

}

//remove storage
exports.removeStorage=function(){

    localStorage.clear();
}