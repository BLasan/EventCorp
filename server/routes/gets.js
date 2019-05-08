const express=require('express');
const router=express.Router();
const axios=require('axios');
const postApi='https://jsonplaceholder.typicode.com';
router.get('/',(req,res)=>{

    axios.get(`${postApi}/posts`).then(gets=>{

        res.status(200).json(gets.data);
    });

  //  res.send('Work');

});

module.exports=router;