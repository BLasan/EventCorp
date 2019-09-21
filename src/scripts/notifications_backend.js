exports.send_notification=function(sender,receiver,roomId,date,database,receiver_name,sender_name,message){

    var notifications= database.collection('register_user').doc(sender).collection('notification-messages').doc(receiver).set({receiver_name:receiver_name,date:date,sender_name:sender_name,roomId:roomId,message:message});
    var receiver_notifications=database.collection('register_user').doc(receiver).collection('notification-messages').doc(sender).set({receiver_name:receiver_name,date:date,sender_name:sender_name,roomId:roomId,message:message});
    console.log(notifications);
    if(notifications&&receiver_notifications){ 
        return 1;
    }

    else{
        return 0;
    }
}

var data=[];
exports.get_all_messages=function(organzier,database,res){

    get_user_messages(organzier,database,function(doc){
        console.log('=>'+doc)
        if(doc){
            res.send({isEmpty:false,data:doc});
        }
        else{
            res.send({isEmpty:true});
        }
    })
   
}

var  get_user_messages=function(organizer,database,callback){
    var docRef = database.collection('register_user').doc(organizer).collection('notification-messages');
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





