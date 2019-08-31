const firebaseInit=require('./firebase-authentication/firebase');
var firebase=firebaseInit.firebaseInit();
var database=firebase.firestore();
const bcrypt = require('bcrypt');

exports.check_credentials=function(email,password,res){

    var docRef = database.collection('register_user').doc(email);

    docRef.get().then(async function(doc) {

        console.log(doc)

        if(doc.exists){
            bcrypt.compare(password,doc.data().password, function(err, res1) {

                if(err) throw err;

                if(res1){
                    res.json({isTrue:'true',role:doc.data().role})
                  }

                  else{
                    res.json({isTrue:false,role:null});
                  }
            });
        }
      
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    
}