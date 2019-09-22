exports.mark_view=function(receiver_email,user_email,res,database){
    var receiver_email=receiver_email;
    var user_email=user_email;
    var mark_view=database.collection('register_user').doc(user_email).collection('bookings').doc(receiver_email).update({view:true});
    if(mark_view) res.send({updated:true});
    else res.send({updated:false});
}