
exports.get_notification_count=function(organizer,database,res){

    get_user_bookings(organizer,database,function(booking_size){

        get_user_notification_messages(organizer,database,function(notify_size){
            console.log('=>'+booking_size);
            let size=notify_size+booking_size;
            console.log(size)
            res.send({size:size});
        })
    })
   
}

var  get_user_bookings=function(organizer,database,callback){
    var docRef = database.collection('register_user').doc(organizer).collection('bookings').where("view","==",false);
    docRef.get()
    .then(snapshot => {
        if(snapshot.empty)
        callback(0);
        else
        callback(snapshot.size);    
    
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}


var  get_user_notification_messages=function(organizer,database,callback){
    var docRef = database.collection('register_user').doc(organizer).collection('notification-messages');
    docRef.get()
    .then(snapshot => {
        if(snapshot.empty)
        callback(0);
        else
        callback(snapshot.size);    
    
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}





