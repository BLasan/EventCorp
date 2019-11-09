
var admin = require("firebase-admin");

var serviceAccount = require("../../../eventcorppro-firebase-adminsdk-yryi3-71f500e6f3.json");

exports.get_admin_firebase=function(){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://eventcorppro.firebaseio.com"
  });

  return admin;
}

exports.get_action_code_settings=function(){
  const actionCodeSettings = {
    url: 'http://localhost:4200/login',
    // This must be true for email link sign-in.
    handleCodeInApp: true,
  };
}
