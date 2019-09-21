var data=[];
exports.book_user=function(searched_user,time,organzier,database,res){
    
    get_sender_details(organzier,database,function(doc){
        if(doc){
            console.log("data;"+doc.user_name);
            get_receiver_details(searched_user,database,function(docs){
                if(docs){
                    console.log(docs[0].user_name+' -data2')
                    var contact=doc.contact;
                    var user_name=doc.user_name;
                    var receiver_email=docs[0].email;
                    var receiver_role=docs[0].role;
                    var sender_data={receiver_email:receiver_email,receiver_id:searched_user,receiver_name:docs[0].user_name,receiver_role:receiver_role,time:time,status:'Pending',view:false};
                    var receiver_data={user_name:user_name,user_email:organzier,time:time,status:'Pending',user_contact:contact,user_role:doc.role,view:false};
                    var send_request=database.collection('register_user').doc(organzier).collection('bookings').doc(receiver_email).set(sender_data);
                    var receive_request=database.collection('register_user').doc(receiver_email).collection('bookings').doc(organzier).set(receiver_data);
                    if(send_request &&receive_request) res.json({success:true});
                    else res.json({success:false})
                }

                else{
                    res.send({success:false});
                }
            })
        }
        else{
            res.send({success:false});
        }

    });
   
}

var get_sender_details=function(organzier,database,callback){
    let cityRef = database.collection('register_user').doc(organzier);
    let getDoc = cityRef.get()
      .then(doc => {
          callback(doc.data());
      })
      .catch(err => {
        console.log('Error getting document', err);
      })

}

var  get_receiver_details=function(searched_user,database,callback){
    // var docRef = database.collection('register_user').doc(searched_user);
    // docRef.get().then(async function(docs) {
    //       callback(docs.data());
    // })
    // .catch(function(error) {
    //    console.log("Error getting document:", error);
    // });
    var docRef = database.collection('register_user');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
    }  

    
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if(doc.data().user_token==searched_user)
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
