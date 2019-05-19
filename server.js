  const artist_insert_data=require('./src/scripts/artist/artist_insert_data');
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
  const multer=require('multer');
  const ejs=require('ejs');
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
  

  const storage=multer.diskStorage({destination:function(req,res,cb){
    cb(null,'./src/assets/storage/images')
  },

  filename:function(req,file,cb){
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    // console.log('hi');
  }

});

    const upload=multer({storage:storage});
      
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
         console.log(errors+"E");
         if(errors || matchPsw){
         if(errors[0].param=='email')
         validEmail=false;

         if(errors[0].param=='name')
         validName=false;

         if(errors[0].param=='country')
         validCountry=false;

         if(errors[0].param=='city')
         validCity=false;

         if(errors[0].param=='contact'){
         validContact=false;
         console.log(validContact,"validContact")
         }

         if(errors[0].param=='password'|| (artist_psw!=re_enter))
         validPassword=false;
         }

        //  var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
        //  recaptcha_url += "secret=" + RECAPTCHA_SECRET + "&";
        //  recaptcha_url += "response=" + req.body["g-recaptcha-response"] + "&";
        //  recaptcha_url += "remoteip=" + req.connection.remoteAddress;
        //  Request(recaptcha_url, function(error, resp, body) {
        //      body = JSON.parse(body);
        //      if(body.success !== undefined && !body.success) {
             
        //          return res.send({ "message": "Captcha validation failed" });
        //      }
        //      console.log(body);
        //      console.log(validPassword);
        //     // res.header("Content-Type", "application/json").send(body);

        //     if(validPassword && body.success==true && !errors){
        //     console.log('Correct');
        //     req.session.success = true;
        //     res.redirect('/artist');
        //     console.log(name+'f');
        //     var det=[{"name":null,"address":null,"city":null,"email":" ","country":null,"contact":" "},
        //     {"validName":validName,"validAddress":validAddress,"validCity":validCity,"validEmail":validEmail,"validCountry":validCountry,"validContact":validContact,"validPassword":validPassword}];
            
        //     //insert data to firebase
        //     var success_data=[{"name":name,"address":address,"city":city,"email":email,"country":country,"contact":contact}];
        //     artist_insert_data.insertArtstInfo(success_data[0]);

        //     io.of('/form').on('connection', socket=> {
        //       console.log('connected:', socket.client.id);
        //       socket.emit('update_form',det);
        //     }); 

        //     }

        //     else{
        //       console.log(email);
        //       console.log(validContact);
        //       var details=[{"name":name,"address":address,"city":city,"email":email,"country":country,"contact":contact},
        //       {"validName":validName,"validAddress":validAddress,"validCity":validCity,"validEmail":validEmail,"validCountry":validCountry,"validContact":validContact,"validPassword":validPassword}];

        //       io.of('/form').on('connection', socket=> {
        //         console.log('connected:', socket.client.id);
        //         socket.emit('update_form',details);
        //       }); 

        //       res.redirect('/artist');

        //     }

        
        // });

  
        if(validPassword && !errors){
          console.log('Correct');

          var det=[{"name":null,"address":null,"city":null,"email":" ","country":null,"contact":" "},
          {"validName":validName,"validAddress":validAddress,"validCity":validCity,"validEmail":validEmail,"validCountry":validCountry,"validContact":validContact,"validPassword":validPassword}];
          
          //insert data to firebase
          var success_data=[{"name":name,"address":address,"city":city,"email":email,"country":country,"contact":contact}];

          //insert data to firebase
          artist_insert_data.insertArtstInfo(success_data[0]);

          io.of('/form').on('connection', socket=> {
            console.log('connected:', socket.client.id);
            socket.emit('update_form',det);
          }); 

          res.redirect('/artist');

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

  

        app.post('/bioData',urlencodedParser,function(req,res){
          
          var company=req.body.company;
          var web_site=req.body.web_site;
          var location=req.body.location;
          var bio=req.body.bio;
          console.log(req.body.company);
          var bio_details=[{"company":company,"web_site":web_site,"location":location,"bio":bio}];
    
          //insert data to firebase
           artist_insert_data.insertBio(bio_details);

          io = require('socket.io')(server, { path: '/bio_data' }).listen(server);
          io.of('/bio_data').on('connection', socket=> {
            console.log('connected:', socket.client.id);
            socket.emit('update_bio',bio_details);
          }); 

          res.redirect('/artist');

        });



              //get album data
      
        app.post('/albumData', upload.single('myImage'),urlencodedParser,(req,res,next)=>{
          // console.log('ji');
          var album_title=req.body.album_title;
          var album_date=req.body.album_date;
          var album_location=req.body.album_location;
          const file = req.file;
          var path_file="../../../assets/storage/images/"+file.filename;
          var album_details=[{"title":album_title,"date":album_date,"location":album_location,"path":path_file}];

          //insert data to firebase
          artist_insert_data.insertAlbumData(album_details[0]);

          console.log('File',file);
          if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
          }
          var album_details=[{"title":album_title,"date":album_date,"location":album_location,"path":path_file}];
          io = require('socket.io')(server, { path: '/album_data' }).listen(server);
          io.of('/album_data').on('connection', socket=> {
            console.log('connected:', socket.client.id);
            socket.emit('update_album',album_details);
          }); 


          res.redirect('/artist');
            // res.send(file)

      
        });


        // app.post('/upload', upload.single('myImage'),urlencodedParser,(req, res, next) => {
        //   const file = req.file
        //   if (!file) {
        //     const error = new Error('Please upload a file')
        //     error.httpStatusCode = 400
        //     return next(error)
        //   }
        //     res.send(file)
          
        // })

       

  console.log('Listening to 4600');
  
  
  server.listen(4600);


   
   
   