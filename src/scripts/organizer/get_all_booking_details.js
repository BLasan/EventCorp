var data=[];
exports.get_all_booking_details=function(organzier,database,res){

    get_user_bookings(organzier,database,function(doc){
        console.log('=>'+doc)
        if(doc){
            res.send({isEmpty:false,data:doc});
        }
        else{
            res.send({isEmpty:true});
        }
    })
   
}

var  get_user_bookings=function(organizer,database,callback){
    var docRef = database.collection('register_user').doc(organizer).collection('bookings');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      isDone=true;
    }  
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      data.push(doc.data());
      isDone=true
    });

    if(isDone){
      callback(data);
      data=[];
    }
    })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}





