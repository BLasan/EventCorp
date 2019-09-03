// const firebaseInit=require('./firebase-authentication/firebase');
// var firebase=firebaseInit.firebaseInit();
//  var database=firebase.firestore();

exports.add_comment=function(comment,user_id,user_name,timeStamp,database){

    var ratings = database.collection('comments').doc(user_id).set({comment:comment,name:user_name,timeStamp:timeStamp});
    if(ratings){ 
        return 1;
    }

    else{
        return 0;
    }
}

exports.load_comment=function(token,database,res){
    console.log(token);
    var data=[];
    var docRef = database.collection('comments').doc(token);
    docRef.get().then(async function(doc) {
        console.log(doc.data());
        
        if (doc.data()=="{}" || !doc.data()) {
            console.log('No matching documents.');
            res.json({success:false}); 
         } 
         
        else{
            data.push(doc.data());
            res.json({success:true,data:data});
            data=[];
        }
})
.catch(err => {
console.log('Error getting documents', err);
});
}