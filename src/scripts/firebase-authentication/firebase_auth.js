exports.auth_user_signup=function(firebase,password,email,res){
   console.log("AUTH USER UPDATE");
    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'http://localhost:4200/email-verify?mode=%3Caction%3E&oobCode=%3Ccode%3E',
        // This must be true.
        handleCodeInApp: true,
     
      };

      var password=password;
      localStorage.setItem('email_entered',email)

      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        
      });

      console.log(localStorage.getItem('email_entered'))

      firebase.auth().sendSignInLinkToEmail(localStorage.getItem('email_entered'),actionCodeSettings)
      .then(function() {
        console.log('sent');
        localStorage.removeItem('email_entered')
        localStorage.setItem('signedUpEmail',email);
        res.json({success:true});
      })
      .catch(function(error) {
        console.log("Error=>"+error);
        //res.json({success:false});
        // Some error occurred, you can inspect the code: error.code
      });
}
