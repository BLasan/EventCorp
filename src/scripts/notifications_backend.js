// // exports.send_notification=function(sender,receiver,roomId,date,database,receiver_name,sender_name,message){

// //     var notifications= database.collection('register_user').doc(sender).collection('notification-messages').doc(receiver).set({receiver_name:receiver_name,date:date,sender_name:sender_name,roomId:roomId,message:message,receiver_email:receiver});
// //     var receiver_notifications=database.collection('register_user').doc(receiver).collection('notification-messages').doc(sender).set({receiver_name:receiver_name,date:date,sender_name:sender_name,roomId:roomId,message:message,view:false});
// //     console.log(notifications);
// //     if(notifications&&receiver_notifications){ 
// //         return 1;
// //     }

// //     else{
// //         return 0;
// //     }
// // }

// exports.send_notifications=function(sender,receiver,date,database,receiver_name,sender_name,message,isOrganizer,res){
//   const require_id=require('./generate_id');
//   console.log(sender+"->SENDER"+receiver+"->RECEIVER");
//   console.log("ISORGANIZER"+isOrganizer)
//   const chat_id=require_id.generate_chat_id(sender,date,receiver);
//   console.log(sender_name+""+receiver+""+receiver_name+""+date+""+message);
//   var notifications= database.collection('chats').doc(chat_id).set({receiver_name:receiver_name,date:date,sender_name:sender_name,roomId:chat_id,message:message,receiver_email:receiver,sender_email:sender,organizer:isOrganizer}).then(function(){
//     if(isOrganizer=='organizer')
//     var receiver_notifications=database.collection('register_user').doc(receiver).collection('notification-messages').doc(sender).set({receiver_name:receiver_name,date:date,sender_name:sender_name,sender_email:sender,roomId:chat_id,view:false});
//     else 
//     var receiver_notifications=true;
//     console.log(notifications);
//     if(receiver_notifications){ 
//         res.send({success:true})
//     }
  
//     else{
//         res.send({success:false})
//     }
//   }).catch(function(error){
//     console.log("Error"+error);
//     res.send({success:false})
//   })

// }


// var data=[];
// exports.get_all_messages=function(organzier,database,res){

//     get_user_messages(organzier,database,function(doc){
//         console.log('=>'+doc)
//         if(doc){
//             res.send({isEmpty:false,data:doc});
//         }
//         else{
//             res.send({isEmpty:true});
//         }
//     })
   
// }

// var  get_user_messages=function(organizer,database,callback){
//     var docRef = database.collection('register_user').doc(organizer).collection('notification-messages');
//     docRef.get()
//     .then(snapshot => {
//     if (snapshot.empty) {
//       console.log('No matching documents.');
//       isDone=true;
//     }  
//     snapshot.forEach(doc => {
//       console.log(doc.id, '=>', doc.data());
//       if(doc.data().view==false)
//       data.push(doc.data());
//       isDone=true
//     });

//     if(isDone){
//       callback(data);
//       data=[];
//     }
//     })
//   .catch(err => {
//     console.log('Error getting documents', err);
//   });
// }









