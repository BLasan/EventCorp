exports.create_event_id=function(date,user_name,event_name){
    let id=date+"@"+event_name;
    id=id.replace(/[/]/g,'$');
    return id;
}

exports.generate_chat_id=function(sender,date,receiver){
    let id=sender+"@"+receiver;
    const sha1=require('sha1');
    const hash=sha1(id);
    return hash;
}