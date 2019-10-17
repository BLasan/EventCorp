exports.create_moderator=function(database,data,email,res){
    var moderator_created=database.collection('moderators').doc(email).set(data).then(function() {
        console.log("updated");
        res.redirect('/add-new-moderator')
    }).catch(function(){
        res.json({success:false});
    });
}