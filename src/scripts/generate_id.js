exports.create_event_id=function(date,user_name,event_name){
    let id=date+"@"+event_name;
    id=id.replace(/[/]/g,'$');
    return id;
}