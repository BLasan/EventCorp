exports.mark_view=function(receiver_email,user_email,type,res,database){
    var receiver_email=receiver_email;
    var user_email=user_email;
    if(type=="booking")
    var mark_notifications=database.collection('register_user').doc(user_email).collection('bookings').doc(receiver_email).update({view:true});
    if(mark_notifications) res.send({updated:true});
    else res.send({updated:false});
}