// const firebaseInit=require('./firebase-authentication/firebase');

// //initialize firebase
// var firebase=firebaseInit.firebaseInit();
// var database=firebase.firestore();
const auth_user=require('./firebase-authentication/firebase_auth');

exports.signup=function(data,database,res,firebase,password){
    console.log("SIGUNP CONSOLE")
    var user_email=data.email;
    console.log(user_email);
    var user_signup=database.collection('register_user').doc(user_email).set(data).then(function() {
        console.log("updated");
        database.collection('signup_notification').doc(user_email).set({view:false,date:new Date(),user_name:data.user_name}).then(function(){
            auth_user.auth_user_signup(firebase,password,user_email,res);
        }).catch(function(){
            res.json({success:false});
        })
    }).catch(function(){
        res.json({success:false});
    });



  
}

exports.delete_account=function(database,res,user){
    var delete_account=database.collection('register_user').doc(user).update({profile_status:'Deleted'});
    if(delete_account) res.send({success:true});
    else res.send({success:false});
}


exports.change_password=function(database,res,password,user,role){
    
    var password_set=database.collection('register_user').doc(user).update({password:password});
    if(password_set){
        if(role=='artist') res.redirect('/artist-settings');
        else if(role=='organizer') res.redirect('/organzier-settings');
        else if(role=='venue_owner') res.redirect('/venue_owner_settings');
        else if (role=='supplier') res.redirect('/supplier-settings');
        else if(role=='admin') res.redirect('/admin-settings');
    }
}


exports.update_validation=function(res,database,user_email,firebase){
    console.log("123");
    var success=database.collection('register_user').doc(user_email).update({verification:true});
    if(success)res.send({success:true});
    else res.send({success:false});
    console.log("SUCCESS")

}


exports.recover_account=function(res,database,user){
    var recover_account=database.collection('register_user').doc(user).update({profile_status:'Active'});
    if(recover_account) res.send({success:true});
    else res.send({success:false});
}



