// const firebaseInit=require('./firebase-authentication/firebase');
// var firebase=firebaseInit.firebaseInit();
//  var database=firebase.firestore();

exports.add_ratings=function(rating,database,token){

    var ratings = database.collection('ratings').doc(token).set({rating:rating});
    console.log(ratings);
    if(ratings){ 
        return 1;
    }

    else{
        return 0;
    }
}

exports.load_ratings=function(token,database,res){
    console.log(token);
    var docRef = database.collection('ratings').doc(token);
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