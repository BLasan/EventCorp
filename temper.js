

  const express=require('express');
  const path=require('path');
  const app=express();
  var fs=require('fs');
  const ExpressValidator = require('express-validator');
  const session = require('express-session');
  const body=require('body-parser');
  var urlencodedParser = body.urlencoded({ extended: false });
  const http=require('http');
  const server=http.Server(app);
  const http1=require('http');
  const server1=http1.Server(app);
  var io = require('socket.io')(server, { path: '/my-table' }).listen(server);
  var io1=require('socket.io')(server1,{path:'/user'}).listen(server1);
  var id=0,isValid=false;
  app.use(ExpressValidator());
  app.use(session({secret: 'krunal', saveUninitialized: false, resave: false}));
  app.use(express.static('src'));
  var password='',repassword='',name='',email='',country='';
  //var data = JSON.parse(fs.readFileSync('data.json'));
  
/*  io.of('/my-table').on('connection', socket=> {
    console.log('connected1:', socket.client.id);
    socket.emit('update',data);
});
*/


/*io1.of('/my-path').on('connection', socket=> {
               
  console.log('connected:', socket.client.id);
  if(isValid){
    console.log(isValid);      
      var user_data = [{
        id:id++,
        u_name:name,
        email:email,
        country:country
      }];

      var originalNoteString = JSON.stringify(user_data);
      fs.writeFileSync('data.json', originalNoteString);
      var data = JSON.parse(fs.readFileSync('data.json'));
      console.log('connected1:', socket.client.id);
     socket.emit('update',data); 
  }
     
   else{

      console.log('Invalid Data');
    }
    
  
  socket.emit('update_data','Bh');
//  socket.emit('update',data);
});
*/


 
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
          
                 io1.of('/user').on('connection', socket=> {
                  console.log('connected:', socket.client.id);
                  socket.emit('update_data',name);
                });    
             req.session.success = true;
             res.redirect('/');
          //  res.sendFile(path.join(__dirname,'/src/app/user-profile'));
  
          }
         
          //res.send("Done");
         // res.sendFile(path.join(__dirname,'/src/app/admin-profile'));
        });

       

  console.log('Listening to 4600');
  
  
  server.listen(4600);
  server1.listen(4700);
  
   /*
  var socketIo = require('socket.io');
  var socketIo1=require('socket.io')({path:'/my-table'});
  const server=http.Server(app);
  const io=socketIo(server)({path:'my-path'});




   */
    


















      /*const express = require('express')
    const bodyParser = require('body-parser')
    const Pusher = require('pusher')
    const cors = require('cors')
    const dotenv = require('dotenv').config()
    const shortId = require('shortid')
    let mocks = require('./mocks')

    const app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    const pusher = new Pusher({
      appId: process.env.PUSHER_APPID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      encrypted: true
    })

    app.post('/employee', (req, res) => {
      // simulate actual db save with id (using shortId) and cr eatedAt added
      const employee = {
        id: shortId.generate(),
        createdAt: new Date().toISOString(),
        ...req.body
      }
      mocks.push(employee) // like our db
      // trigger this update to our pushers listeners
      pusher.trigger('employee', 'new', employee)
      res.send(employee)
    })

    app.delete('/employee/:id', (req, res) => {
      const employee = mocks.find(emp => emp.id === req.params.id)
      mocks = mocks.filter(emp => emp.id !== employee.id)
      pusher.trigger('employee', 'deleted', employee)
      res.send(employee)
    })

    app.get('/employee', (req, res) => {
      res.send(mocks)
    })

    app.listen(2000, () => console.log('Listening at 2000'))
    */

  /* const express=require('express');
   const path=require('path');
   const app=express();
   var fs=require('fs');
   const gets=require('./server/routes/gets');
   const axios=require('axios');
   var cors = require('cors');
  // const app = require('express')();
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);
   
   app.use(cors()) // Use this after the variable declaration
   
   app.use(express.static('src'));
   app.use('/gets',gets);
   app.get('*',(req,res)=>{
   
   })
   
      
   const port=process.env.PORT || 4600;
   
   app.listen(port,(req,res)=>{
   
       console.log(port);
   });
*/



   /*var request = require('request');
   
   var requestData = {
     request: {
       slice: [
         {
           origin: "ZRH",
           destination: "DUS",
           date: "2014-12-02"
         }
       ],
       passengers: {
         adultCount: 1,
         infantInLapCount: 0,
         infantInSeatCount: 0,
         childCount: 0,
         seniorCount: 0
       },
       solutions: 2,
       refundable: false
     }
   };
   
   request('http://localhost:4600',
           { json: true, body: requestData },
           function(err, res, body) {
     // `body` is a js object if request was successful
   });
   
   */

     
   /*request.get({
     url: 'https://www.google.com',
     body: obj,
     json: true
   }, function(error, response, body){
   
   console.log(body);
   
   });
   */
   
   
   