// exports.send_notification=function(sender,receiver,roomId,date,database,receiver_name,sender_name,message){
//     console.log("ROOM:"+roomId);
//     var notifications= database.collection('chats').doc(roomId.toString(16)).set({sender_email:sender,receiver_email:receiver,receiver_name:receiver_name,date:date,sender_name:sender_name,roomId:roomId,message:message});
//     console.log(notifications);
//     if(notifications){ 
//         return 1;
//     }

//     else{
//         return 0;
//     }
// }

