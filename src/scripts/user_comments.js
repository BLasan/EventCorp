export function add_comment_script(){
    $(document).click('#load_comments',function(e){
        e.preventDefault();
        $('#comments').removeAttr('style');
        $('#remove_items').removeAttr('style');
        $('#load_items').css('display','none');
    });

}

export function remove_comment_script(){
    $(document).click('#remove_comments',function(e){
        e.preventDefault();
        $('#comments').css('display','none');
        $('#remove_items').css('display','none');
        $('#load_items').css('display','block');
    });
}

export function bind_scroll(){
    $('#comments').attr('class','list-group');
}
