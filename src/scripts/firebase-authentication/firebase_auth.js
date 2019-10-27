exports.auth_user_signup=function(admin,firebase,password,email,res){
   console.log("AUTH USER UPDATE");
    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'http://localhost:4200/email-verify?mode=%3Caction%3E&oobCode=%3Ccode%3E',
        // This must be true.
        handleCodeInApp: true,
     
      };

      var password=password;
      localStorage.setItem('email_entered',email);
      var displayName="EventCorp";
      console.log(localStorage.getItem('email_entered'))
      localStorage.setItem('signedUpEmail',email);
      // const get_actionCode=require('./src/scripts/firebase-authentication/firebase-admin__init');
      // const actionCodeSettings=get_actionCode.get_action_code_settings();

      firebase.auth().createUserWithEmailAndPassword(localStorage.getItem('email_entered'), password).then(()=>{
        // firebase.auth().signInWithEmailAndPassword(localStorage.getItem('email_entered'), password).then(()=>{
          // var user = firebase.auth().currentUser;
          // console.log(user)
          // user.sendEmailVerification().then(function() {
          //   console.log("Done");
          //   res.json({success:true});

          // }).catch(function(error) {
          //   console.log(error);
          //   res.json({success:false});
          // });
        //   console.log("Success"); 
        // })
        // .catch(function(error) {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   res.json({success:false});
        // });
        var user = firebase.auth().currentUser;
        console.log(user)
        user.sendEmailVerification().then(function() {
          console.log("Done");
          res.json({success:true});
          localStorage.removeItem('email_entered');

        }).catch(function(error) {
          console.log(error);
          res.json({success:false});
          localStorage.removeItem('email_entered');
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        res.json({success:false});
        localStorage.removeItem('email_entered');
      });

        // user.sendEmailVerification().then(function() {
        //       // Email sent.
        // }).catch(function(error) {
        //    // An error happened.
        // });
      
      // admin.auth().generateEmailVerificationLink(localStorage.getItem('email_entered'), actionCodeSettings)
      // .then((link) => {
      //   console.log(link)
      //     localStorage.removeItem('email_entered')
      //     localStorage.setItem('signedUpEmail',email);
      //     res.json({success:true});
    
      //    // return sendCustomVerificationEmail(useremail, displayName, link);
      // })
      //  .catch((error) => {
      //    console.log(error);
      //  });

      console.log(localStorage.getItem('signedUpEmail'))

      // firebase.auth().sendSignInLinkToEmail(localStorage.getItem('email_entered'),actionCodeSettings)
      // .then(function() {
      //   console.log('sent');
      //   localStorage.removeItem('email_entered')
      //   localStorage.setItem('signedUpEmail',email);
      //   res.json({success:true});
      // })
      // .catch(function(error) {
      //   console.log("Error=>"+error);
      //   //res.json({success:false});
      //   // Some error occurred, you can inspect the code: error.code
      // });
}
