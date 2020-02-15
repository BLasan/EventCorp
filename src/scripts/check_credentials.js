// // const firebaseInit=require('./firebase-authentication/firebase');
// // var firebase=firebaseInit.firebaseInit();
// // var database=firebase.firestore();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// exports.check_credentials=function(email,password,res,database,user,firebase){
//     // var users= localStorage.getItem('Auth_user')
//     // console.log(users.uid+"->U")
//     // var credentials = firebase.auth.EmailAuthProvider.credential(
//     //    email,
//     //    password
//     //    );
//     database.collection('register_user').doc(email).update({active_status:'login'})
//     var docRef = database.collection('register_user').doc(email);

//     docRef.get().then(async function(doc) {

//        // console.log(doc.data().password)
//       //  console.log(password);

//         if(doc.exists){

//             bcrypt.compare(password,doc.data().password, function(err, res1) {

//                 if(err) throw err;

//                 if(res1){
//                       console.log(doc.data().profile_status+","+doc.data().verification);
//                   //  const token=create_user_token(user,res);
//                   //  var toke_update= database.collection('register_user').doc(email).update({user_token:token});

//                     if(doc.data().profile_status=='Active' && doc.data().verification){
//                         console.log("helo");
//                         //users.reauthenticateWithCredential(credentials);
//                         firebase.auth().signInWithEmailAndPassword(email, password).then(cred=>{
//                             console.log("Success->"+cred.user.uid);
//                             localStorage.removeItem('signedUpEmail');
//                             res.send({isTrue:'true',role:doc.data().role,user_name:doc.data().user_name,token:null,verification:doc.data().verification});
//                         }).catch(function(error) {
//                             console.log(error)
//                         });

//                     }
//                     else{
//                         res.json({isTrue:false,role:null,token:null,user_name:null,verification:false});
//                     } 
//                   }

//                   else{
//                     res.json({isTrue:false,role:null,token:null,user_name:null,verification:false});
//                   }
//             });
//         }

//         else{
//             res.json({isTrue:false,role:null,token:null,user_name:null,verification:false});
//         }

      
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });
    
// }



// function create_user_token(user){
//         try{
//             const token = jwt.sign({user:user},'secret-key',{ expiresIn:60});
//             console.log(token);
//             return token;
//         }catch(err){
//             res.send(err);
//         }

//     }

