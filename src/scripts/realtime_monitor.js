const firestore=require("../scripts/firebase-authentication/firebase");
var data=[];
let success=false;
module.exports.get_realtime_data=function(){
    let database=firestore.firebaseInit(10);
   // alert(database)
    database.collection("register_user")
    .onSnapshot(function(snapshot) {
       // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        let changes=snapshot.docChanges();
        changes.forEach(element => {
            if(element.type=='added'){
               // console.log(changes.doc.id)
                data.push(element.doc.id);
                success=true;
            }
        });
        
        if(success){
            console.log("SE "+data)
            return data;
        } 
        console.log(" data: ", changes[0].doc.id);
    });
}