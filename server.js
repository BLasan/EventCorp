  // const artist_insert_data=require('./src/scripts/artist/artist_insert_data');
  const express=require('express');
  var Request = require("request");
  const path=require('path');
  const cors = require('cors');
  const app=express();
  var fs=require('fs');
  const ExpressValidator = require('express-validator');
  const session = require('express-session');
  const body=require('body-parser');
  var urlencodedParser = body.urlencoded({ extended: false });
  const http=require('http');
  const server=http.Server(app);
  const multer=require('multer');
  const ejs=require('ejs');
  var io = require('socket.io')(server, { path: '/form' }).listen(server);
  var io1= require('socket.io').listen(server);
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const firebaseInit=require('./src/scripts/firebase-authentication/firebase');
  const verify_user_token=require('./src/scripts/verify_user_token');
  const organizer_event=require('./src/scripts/organizer/create_new_event');
  //initialize firebase
  var firebase=firebaseInit.firebaseInit();
  var database=firebase.firestore();





  const login_credentials=require('./src/scripts/check_credentials');
  const ratings=require('./src/scripts/rating');

  app.use(body.json());
  app.use(ExpressValidator());
  app.use(session({secret: 'krunal', saveUninitialized: false, resave: false}));
  app.use(express.static('src'));
  app.use(cors())
  var password='',repassword='',name='',email='',country='';
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
  const RECAPTCHA_SECRET = "6Le6daAUAAAAAD-dA1jOUI_dZKVg2z7v4MDFfl9p";
  // const grpc = require('grpc')
  // const protoLoader = require('@grpc/proto-loader')
  // const packageDefinition = protoLoader.loadSync('notes.proto');
  // const notesProto = grpc.loadPackageDefinition(packageDefinition);
  
  const storage_organizer=multer.diskStorage({destination:function(req,file,cb){
    console.log(file.mimetype)
    if(file.mimetype=="image/png")
    cb(null,'./src/storage/organizer/images')
    else
    cb(null,'./src/storage/organizer/videos')
   
  },
  filename:function(req,file,cb){
     cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    //  console.log(req.files);
  }
});

    const upload=multer({storage:storage_organizer});
      
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


        app.post('/sign_up',urlencodedParser,function(req,res){

          console.log('hello');
          var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
          var token = randomToken(40);
          var user_name=req.body.user_name;
          var user_email=req.body.user_email;
          var role=req.body.role_sel;
          var address1=req.body.address1;
          var address2=req.body.address2;
          var city=req.body.city;
          var state=req.body.state_sel;
          var country_code=req.body.countryCode_sel;
          var contact=req.body.contact;
          var user_password=req.body.user_password;
          const user_signup=require('./src/scripts/signup');
          console.log(user_password)

          bcrypt.hash(user_password, saltRounds, function(err, hash) {
            if(err) throw err;
            var data=[{user_name:user_name,email:user_email,role:role,address1:address1,address2:address2,city:city,state:state,country_code:country_code,contact:contact,password:hash}]
            const result=user_signup.signup(data[0],database);
            console.log(result)
            if(result==1)
            res.json({success:true});
            else
            res.json({success:false});
          });
          
        });



        //login-credentials
        app.post('/login_credentials',urlencodedParser,function(req,res){

          var email=req.body[0];
          var password=req.body[1];
          console.log(email);
          const user={email:email,password:password};
          login_credentials.check_credentials(email,password,res,database,user);

        });



        //add-ratings
        app.post('/add_rating',urlencodedParser,function(req,res){
          var rating=req.body.rating;
          var email=req.body.email;
          console.log(rating);
          try{
            // var decoded = jwt.verify(token, 'secret-key');
            const result=ratings.add_ratings(rating,database,email,res);
            if(result==1)
             res.json({success:true});
  
            else
             res.json({success:false});

          }catch(err){
            res.send(err);
          }

        });




        //create new event
        app.post('/create_new_event',upload.any(),urlencodedParser,function(req,res){

          if(req.files[0]==null || req.files[1]==null){
            video_path=null;
            image_path=null;
          }

          else if(req.files[0]==null){
            video_path="storage/organizer/videos/"+req.files[1].filename;
          }

          else if(req.files[1]==null){
            image_path="storage/organizer/images/"+req.files[0].filename;
          }

          else{
            video_path="storage/organizer/videos/"+req.files[1].filename;
            image_path="storage/organizer/images/"+req.files[0].filename;
          }

          var event_name=req.body.event_name;
          var venue=req.body.venue;
          var date=req.body.date;
          console.log(date);
          console.log(image_path)
          var time=req.body.time;
          console.log(time);
          var artists=req.body.artists;
          console.log(typeof(artists[0]));
          console.log(artists.split(',')) 
          var venue_owners=req.body['venue_owners[]'].split(',');
          var suppliers=req.body['suppliers[]'].split(',');
          console.log('Venue:',venue_owners);
          console.log('Supp:',suppliers);
          var user_name=req.body.user_name;
          console.log(user_name);
          const data={event_name:event_name,venue:venue,date:date,time:time,artists:artist_array,venue_owners:venue_owners,suppliers:suppliers,user_name:user_name,image_path:image_path,video_path:video_path};
          var result=organizer_event.create_new_event(data,database);
          if(result) res.redirect('organizer-events');
          else res.send('Error Inserting');
        })




        //add-comment
        app.post('/add_comment',urlencodedParser,function(req,res){
          var comment=req.body.comment;
          var user_id=req.body.user_id;
          var user_name=req.body.user_name;
          var timeStamp=req.body.timeStamp;
          const add_comments=require('./src/scripts/comments_backend');
          const returned_val=add_comments.add_comment(comment,user_id,user_name,timeStamp,database);
          console.log(returned_val)
          if(returned_val==1)
            res.json({success:true});
          else
            res.json({success:false});
        });




        //load-comment
        app.get('/load_comment/:token',urlencodedParser,function(req,res){
          var token=req.params.token;
          const load_comments=require('./src/scripts/comments_backend');
          load_comments.load_comment(token,database,res);
        })



        //load-users
        app.post('/load_users',urlencodedParser,function(req,res){
          var user_role=req.body.user_role;
          console.log(user_role);
          const load_users=require('./src/scripts/load_all_users');
          load_users.user_info(user_role,res,database);

        });



        //load-user-ratings
        app.get('/load_user_ratings/:email',urlencodedParser,function(req,res){
          var user_email=req.params.email;
          console.log(user_email);
          ratings.load_ratings(user_email,database,res);

        });



        //load events
        app.post('/load_events',urlencodedParser,function(req,res){
          var user_name=req.body[0];
          console.log(user_name)
          organizer_event.get_event_data(user_name,database,res);
        });



        //book-user
        app.post('/book_user',urlencodedParser,function(req,res){
          var searched_user=req.body[0];
          var time=req.body[1];
          var organizer=req.body[2];
          console.log(organizer+' organizer');
          const book_user=require('./src/scripts/organizer/book_user');
          book_user.book_user(searched_user,time,organizer,database,res);

        });



        //get-all-booking details
        app.post('/get_all_bookings',urlencodedParser,function(req,res){
          var searched_user=req.body[0];
          var organizer=req.body[1];
          console.log(organizer)
          const get_booking_details=require('./src/scripts/organizer/get_booking_details');
          get_booking_details.get_booking_details(searched_user,organizer,database,res);

        });


        
        //get-all-booking-notifications
        app.post('/get_all_booking_notifications',urlencodedParser,function(req,res){
          var organizer_email=req.body[0];
          const get_all_bookings=require('./src/scripts/organizer/get_all_booking_details');
          get_all_bookings.get_all_booking_details(organizer_email,database,res);

        });


        //delete-notifications
        app.post('/mark_view_notifications',urlencodedParser,function(req,res){
          var receiver_email=req.body[0];
          var user_email=req.body[1];
          console.log(user_email)
          const mark_view=require('./src/scripts/organizer/mark_viewed_booking');
          mark_view.mark_view( receiver_email,user_email,res,database);

        })

    
      console.log('Listening to 4600');
      server.listen(4600);
      io1.on('connection',(socket)=>{

    socket.on('join',function(data){
      if(data.message=="Welcome")
      socket.join(data.room);
      console.log('New connection made '+data.user+' '+data.message);
      socket.broadcast.to(data.room).emit('new user',{user:data.user,message:data.message});

    });

  });


   
   
   