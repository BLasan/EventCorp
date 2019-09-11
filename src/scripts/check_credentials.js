// const firebaseInit=require('./firebase-authentication/firebase');
// var firebase=firebaseInit.firebaseInit();
// var database=firebase.firestore();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.check_credentials=function(email,password,res,database,user){

    var docRef = database.collection('register_user').doc(email);

    docRef.get().then(async function(doc) {

        console.log(doc.data().password)
        console.log(password);

        if(doc.exists){

            bcrypt.compare(password,doc.data().password, function(err, res1) {

                if(err) throw err;

                if(res1){
                    console.log(user);
                    const token=create_user_token(user,res);
                    var toke_update= database.collection('register_user').doc(email).update({user_token:token});
                    if(toke_update){
                        res.json({isTrue:'true',role:doc.data().role,user_name:doc.data().user_name,token:token});
                    }
                    else{
                        res.json({isTrue:false,role:null,token:null,user_name:null});
                    }
                  }

                  else{
                    res.json({isTrue:false,role:null,token:null,user_name:null});
                  }
            });
        }

        else{
            res.json({isTrue:false,role:null,token:null,user_name:null});
        }

      
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    
}



function create_user_token(user){
        try{
            const token = jwt.sign({user:user},'secret-key',{ expiresIn:60});
            console.log(token);
            return token;
        }catch(err){
            res.send(err);
        }

    }

