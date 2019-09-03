// const firebaseInit=require('./firebase-authentication/firebase');
// var firebase=firebaseInit.firebaseInit();
// var database=firebase.firestore();
const bcrypt = require('bcrypt');

exports.check_credentials=function(email,password,res,database){

    var docRef = database.collection('register_user').doc(email);

    docRef.get().then(async function(doc) {

        console.log(doc.data().password)
        console.log(password);

        if(doc.exists){

            bcrypt.compare(password,doc.data().password, function(err, res1) {

                if(err) throw err;

                if(res1){
                    res.json({isTrue:'true',role:doc.data().role,token:doc.data().user_token,user_name:doc.data().user_name})
                  }

                  else{
                    res.json({isTrue:false,role:null,token:null,user_name:null});
                  }
            });
        }

        else{
            res.json({isTrue:false,role:null,token:null,user_name:null});
        }

        database.disableNetwork();
      
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    
}