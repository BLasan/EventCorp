var data=[];
exports.get_booking_details=function(searched_user,organzier,database,res){

    get_receiver_details(searched_user,database,function(docs){
        console.log(docs)
        if(docs){
            var receiver=docs[0].email;
            var docRef = database.collection('register_user').doc(organzier).collection('bookings').doc(receiver);
            docRef.get().then(async function(doc) {
                if(doc.exists){
                 res.send({success:true,data:doc.data()})       
                }
                else{
                   res.send({success:false});
                } 
            }).catch(function(error) {
            console.log("Error getting document:", error);
            });
        }
        else{
            res.send({success:false});
        }
    })
   
}

var  get_receiver_details=function(searched_user,database,callback){
    var docRef = database.collection('register_user');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      isDone=true;
    }  
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if(doc.data().user_token!=searched_user)
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





