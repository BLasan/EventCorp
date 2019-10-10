exports.update_user_bio=function(database,res,user_details){
    console.log(user_details.bio)
    var updated=database.collection('register_user').doc(user_details.email).update(user_details);
    if(updated){
        res.redirect('/organizer-profile')
       // const user_details_get=require('./searched_user_details');
    
       // user_details_get.get_searched_user_details(user_details.email,res,database);
    }
    else res.send({success:false});
}