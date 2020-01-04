exports.update_count=function(count){
    if(count==0) document.getElementById('notification_count_id').innerHTML="";
    else
    document.getElementById('notification_count_id').innerHTML=count;
}