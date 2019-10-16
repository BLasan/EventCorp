// const firebaseInit=require('./firebase-authentication/firebase');
// var firebase=firebaseInit.firebaseInit();
//  var database=firebase.firestore();

exports.add_comment=function(comment,user_email,user_name,timeStamp,database){

    var ratings = database.collection('comments').doc(user_email).set({comment:comment,name:user_name,timeStamp:timeStamp});
    if(ratings){ 
        return 1;
    }

    else{
        return 0;
    }
}

exports.load_comment=function(email,database,res){
    console.log(email);
    var data=[];
    var docRef = database.collection('comments').doc(email);
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