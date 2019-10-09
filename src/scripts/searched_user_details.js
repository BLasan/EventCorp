
exports.get_searched_user_details=function(email,res,database){
    console.log("UserEmail:"+email)
    var docRef = database.collection('register_user').doc(email);
    docRef.get().then(async function(doc) {
        console.log("UseData:"+doc.data().role)
        if(doc.data()){
            res.json({isTrue:'true',role:doc.data().role,user_name:doc.data().user_name,status:doc.data().active_status,data:doc.data(),bio:doc.data().bio,success:true});      
        }

        else{
            res.json({isTrue:false,role:null,token:null,user_name:null,status:null,bio:null,success:false});
        }

      
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    
}


