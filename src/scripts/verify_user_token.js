
exports.verify_user=function(req,res,next){
    const userHeader=req.headers['authorization'];
    if(typeof userHeader!='undefined'){
        const user=userHeader.split(' ');
        const user_token=user[1];
        req.token=user_token;
        console.log(user_token);
        next();
    }
    else{
        res.sendStatus('403');
    }
}