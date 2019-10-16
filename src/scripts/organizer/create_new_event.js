var data=[];

exports.create_new_event=function(data,database,id,res,user_role){

    var user_email=data.user_name;
    console.log(database+'database');
    console.log(data);
    console.log(id)
    var create_event=database.collection('register_user').doc(user_email).collection('MyEvents').doc(id).set(data).then(function() {
      if(create_event) {
        if(user_role=='organizer')
        res.redirect('organizer-events');
        else if(user_role=='artist')
        res.redirect('artist-calender');
        else if(user_role=='venue_owner')
        res.redirect('organizer-events');
        else if(user_role=='supplier')
        res.redirect('organizer-events');
      }
      else res.send('Error Inserting');
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
    
    
}

exports.get_event_data=function(user_name,database,res){

  get_event_data(user_name,database,function(data){
    // console.log('=>'+data[0].artists);
    if(data){
        res.send({isEmpty:false,data:data,size:data.length});
    }
    else{
        res.send({isEmpty:true});
    }
})


}

function get_event_data(user_name,database,callback){
  console.log(user_name+"=>USER NAME")
  var docRef = database.collection('register_user').doc(user_name).collection('MyEvents');
  docRef.get().then(snapshot => {
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
        console.log("MYDATA=>"+data.length)
        callback(data);
        data=[];
      }
      })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}