var data=[];

exports.load_chat_list=function(database,res,user,user_role){

    var docRef = database.collection('chats');
    docRef.get()
    .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if((doc.data().sender_email==user) && user_role=='organizer')
      data.push(doc.data());
      else if(doc.data().receiver_email==user && user_role!='organizer')
      data.push(doc.data());
      isDone=true
    });

    if(isDone){
      res.send(data);
      data=[];
    }



    })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}