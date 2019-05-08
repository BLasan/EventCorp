

  const express=require('express');
  var Request = require("request");
  const path=require('path');
  const app=express();
  var fs=require('fs');
  const ExpressValidator = require('express-validator');
  const session = require('express-session');
  const body=require('body-parser');
  var urlencodedParser = body.urlencoded({ extended: false });
  const http=require('http');
  const server=http.Server(app);
  //const http1=require('http');
  //const server1=http1.Server(app);
  var io = require('socket.io')(server, { path: '/form' }).listen(server);
  
  var id=0,isValid=false;
  app.use(body.json());
  app.use(ExpressValidator());
  app.use(session({secret: 'krunal', saveUninitialized: false, resave: false}));
  app.use(express.static('src'));
  var password='',repassword='',name='',email='',country='';
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
  const RECAPTCHA_SECRET = "6Le6daAUAAAAAD-dA1jOUI_dZKVg2z7v4MDFfl9p";

  // Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA95SG6_4tkcDHDySiuQfVt9cbm_kyUwhk",
  authDomain: "eventcorppro.firebaseapp.com",
  databaseURL: "https://eventcorppro.firebaseio.com",
  projectId: "eventcorppro",
  storageBucket: "eventcorppro.appspot.com",
  messagingSenderId: "886719532814",
  appId: "1:886719532814:web:9424058ace3d13af"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().createUserWithEmailAndPassword("benuraab@gmail.com","benura").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(errorCode,"+",errorMessage);
  // ...
});


var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:4200',
  // This must be true.
  handleCodeInApp: true,
  
};



firebase.auth().sendSignInLinkToEmail("benuraab@gmail.com",actionCodeSettings)
  .then(function() {
    console.log('sent')
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
   // window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(function(error) {
    console.log('Error')
    // Some error occurred, you can inspect the code: error.code
  });



      app.post('/con',urlencodedParser,function (req, res) {
          password = req.body.password;
          repassword=req.body.re_submission;
          name=req.body.user_name;
          email=req.body.mail;
          country=req.body.country;
          var isTrue=false;
          if(password==repassword)
           isTrue=true;
          else
          isTrue=false;
          req.check('mail', 'Required').notEmpty();
          req.check('password','Enter minimum 6 characters').isLength({min:6}).notEmpty();
          req.check('f_name','Required').notEmpty();
          req.check('l_name','Required').notEmpty();
          req.check('address','Required').notEmpty();
          req.check('country','Required').notEmpty();
          req.check('p_code','Required').notEmpty();
          req.check('contact','Required').notEmpty();
          req.check('contact','Enter 13 digits').isNumeric().isLength({min:13});
         
          console.log(req.body.mail);
          var errors = req.validationErrors();
          if(errors && !isTrue){
         
             req.session.errors = errors;
             req.session.success = false;
             console.log(errors);
             res.redirect('/user-profile');
          }
          else{
                isValid=true;
          
             req.session.success = true;
             res.redirect('/');
        
  
          }
         
  
        });

        app.post('/details',urlencodedParser,function(req,res){
         
         var artist_psw=req.body.password;
         email=req.body.email;
         var name=req.body.name;
         var address=req.body.address;
         var city=req.body.city;
         var country=req.body.country;
         var contact=req.body.contact;
         var re_enter=req.body.re_enter;

       
         
         console.log(contact);

         req.check('email', 'Required').notEmpty();
         req.check('password','Enter minimum 6 characters').isLength({min:6}).notEmpty();
         req.check('name','Required').notEmpty();
         req.check('address','Required').notEmpty();
         req.check('country','Required').notEmpty();
         req.check('city','Required').notEmpty();
         req.check('contact','Required').notEmpty();
         req.check('contact','Enter 13 digits').isNumeric().isLength({min:13});
         
         var matchPsw=false;
         var errors = req.validationErrors();
         var validEmail=true,validName=true,validCity=true,validAddress=true,validCountry=true,validContact=true,validPassword=true;
         
         if( (artist_psw!=re_enter)){

          matchPsw=true;
         }
         console.log(errors);
         if(errors && matchPsw){
         if(errors[0].param=='email')
         validEmail=false;

         if(errors[0].param=='name')
         validName=false;

         if(errors[0].param=='country')
         validCountry=false;

         if(errors[0].param=='city')
         validCity=false;

         if(errors[0].param=='contact')
         validContact=false;

         if(errors[0].param=='password'|| (artist_psw!=re_enter))
         validPassword=false;
         }

         var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
         recaptcha_url += "secret=" + RECAPTCHA_SECRET + "&";

         recaptcha_url += "response=" + req.body["g-recaptcha-response"] + "&";
         recaptcha_url += "remoteip=" + req.connection.remoteAddress;
         Request(recaptcha_url, function(error, resp, body) {
             body = JSON.parse(body);
             if(body.success !== undefined && !body.success) {
             
                 return res.send({ "message": "Captcha validation failed" });
             }
             console.log(body);
             console.log(validPassword);
            // res.header("Content-Type", "application/json").send(body);

            if(validPassword && body.success==true && !errors){
            console.log('Correct');
            req.session.success = true;
            res.redirect('/artist');
            console.log(name+'f');
            var det=[{"name":null,"address":null,"city":null,"email":" ","country":null,"contact":" "},
            {"validName":validName,"validAddress":validAddress,"validCity":validCity,"validEmail":validEmail,"validCountry":validCountry,"validContact":validContact,"validPassword":validPassword}];

            io.of('/form').on('connection', socket=> {
              console.log('connected:', socket.client.id);
              socket.emit('update_form',det);
            }); 

            }

            else{
              console.log(email);
              console.log(validContact);
              var details=[{"name":name,"address":address,"city":city,"email":email,"country":country,"contact":contact},
              {"validName":validName,"validAddress":validAddress,"validCity":validCity,"validEmail":validEmail,"validCountry":validCountry,"validContact":validContact,"validPassword":validPassword}];

              io.of('/form').on('connection', socket=> {
                console.log('connected:', socket.client.id);
                socket.emit('update_form',details);
              }); 

              res.redirect('/artist');

            }

         });

        });



        app.post('/bioData',urlencodedParser,function(req,res){
          
          var company=req.body.company;
          var web_site=req.body.web_site;
          var location=req.body.location;
          var bio=req.body.bio;
          console.log(req.body.company);
          var bio_details=[{"company":company,"web_site":web_site,"location":location,"bio":bio}];

          io = require('socket.io')(server, { path: '/bio_data' }).listen(server);
          io.of('/bio_data').on('connection', socket=> {
            console.log('connected:', socket.client.id);
            socket.emit('update_bio',bio_details);
          }); 

          res.redirect('/artist');



        });

        app.post('/albumData',urlencodedParser,(req,res)=>{

          var album_title=req.body.album_title;
          var album_date=req.body.album_date;
          var album_location=req.body.album_location;

          var album_details=[{"title":album_title,"date":album_date,"location":album_location}];

          io = require('socket.io')(server, { path: '/album_data' }).listen(server);
          io.of('/album_data').on('connection',socket=>{
            console.log('connected:',socket.client.id);
            socket.emit('update_album',album_details);
          });

          res.redirect('/artist');





        });

       

  console.log('Listening to 4600');
  
  
  server.listen(4600);


   
   
   