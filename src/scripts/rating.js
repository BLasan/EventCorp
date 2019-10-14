// const firebaseInit=require('./firebase-authentication/firebase');
// var firebase=firebaseInit.firebaseInit();
//  var database=firebase.firestore();

exports.add_ratings=function(rating,database,email,res){
 
    var docRef = database.collection("register_user").doc(email);
    docRef.get().then(function(doc) {
    console.log(doc.data().role);

    if (doc.exists) {
        console.log("Document data:", doc.data());
        var user_role=doc.data().role;
        var ratings = database.collection('ratings').doc(email).set({rating:rating,role:user_role,image_url:doc.data().image_url,name:doc.data().user_name,email:email});
        console.log(ratings);
        if(ratings){ 
            res.json({success:true});
        }
    
        else{
            res.json({success:false});
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}

exports.load_ratings=function(email,database,res){
    console.log(email);

    var docRef = database.collection('ratings').doc(email);
    docRef.get().then(async function(doc) {
       // console.log(doc.data())
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



function load_user_details(email,database){
console.log("Hello")
var docRef = database.collection("register_user").doc(email);
docRef.get().then(function(doc) {
    console.log(doc.data().role)
    if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data().role;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}