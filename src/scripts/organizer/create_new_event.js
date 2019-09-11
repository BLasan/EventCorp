

exports.create_new_event=function(data,database){

    var user_email=data.user_name;
    console.log(database+'database');
    console.log(data)
    var create_event=database.collection('organizer_events').doc(user_email).set(data);

    if(create_event) return 1;
    else return 0;   
    
}

exports.get_event_data=function(user_name,database,res){

    var docRef = database.collection('organizer_events').doc(user_name);
    docRef.get().then(async function(doc) {
        console.log(doc.data());

        if (!doc.data()) {
            console.log('No matching documents.');
            res.json({success:false}); 
         } 
         
        else{
            res.json({success:true,data:doc.data()});
        }
      })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}