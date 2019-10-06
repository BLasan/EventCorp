exports.update_user_bio=function(database,res,user_details){
    var updated=database.collection('register_user').doc(user_details.email).update(user_details);
    if(updated){
        const user_details=require('./searched_user_details');
        user_details.get_searched_user_details(user_details.email,res,database);
    }
    else res.send({success:false});
}