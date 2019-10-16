exports.mark_view=function(sender_email,user_email,type,res,database){
    var sender_mail=sender_email;
    var user_email=user_email;
    if(type=="booking")
    var mark_notifications=database.collection('register_user').doc(user_email).collection('bookings').doc(sender_email).update({view:true});
    else
    var mark_notifications=database.collection('register_user').doc(user_email).collection('notification-messages').doc(sender_email).update({view:true});
    if(mark_notifications) res.send({updated:true});
    else res.send({updated:false});
}