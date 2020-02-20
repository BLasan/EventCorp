const express=require('express');
const app=express();
const http=require('http');
const server=http.Server(app);
const cors=require('cors');
const body=require('body-parser');
const urlencodedParser=body.urlencoded({extended:false});
app.use(cors());
app.use(body.urlencoded({
    extended:false
}));
app.use(body.json());

        //send email
        app.post('/send_mail',urlencodedParser,function(req,res){
          console.log(req.body[0]+" "+req.body[1]+" "+req.body[2])
          const sgMail = require('@sendgrid/mail');
          sgMail.setApiKey("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");
          const msg={
              to: req.body[0],
              from: req.body[1],
              subject: req.body[2],
              text: req.body[3],
              html: req.body[4],
              // templateId:'d-1930c09d411f4d479cb8d1a372bbe931'
          }
          //console.log(msg);
            sgMail.send(msg).then(()=>{
              res.send({success:true})
            }).catch(err=>{
              console.log(err)
              // console.log(err);
              res.send({success:false});
            })
          
          });
    
      console.log('Listening to 4600');
      server.listen(80);
      
  




   
   
   