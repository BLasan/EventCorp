// const firebaseInit=require('./firebase-authentication/firebase');
// var firebase=firebaseInit.firebaseInit();
//  var database=firebase.firestore();

exports.add_ratings=function(rating,database,email){

    var ratings = database.collection('ratings').doc(email).set({rating:rating});
    console.log(ratings);
    if(ratings){ 
        return 1;
    }

    else{
        return 0;
    }
}

exports.load_ratings=function(email,database,res){
    console.log(email);
    var docRef = database.collection('ratings').doc(email);
    docRef.get().then(async function(doc) {
        console.log(doc.data())
        if (!doc.data()) {
            console.log('No matching documents.');
            res.json({success:false}); 
         } 
         
        else{
            res.json({success:true,data:doc.data()});
        }
})
.catch(err => {
console.log('Error getting documents', err);
});
}