exports.logout_user=function(database,res,email){
    var notifications= database.collection('register_user').doc(email).update({active_status:'logout'});
    if(notifications) res.send({success:true});
    else res.send({success:false});
}