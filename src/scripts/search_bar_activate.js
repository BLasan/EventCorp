

export function deactivate_searchBar(){

    $('#search_box').attr('disabled','disabled');
    $('#search_button').attr('disabled','disabled');
    $('#search_bar').css('display','none');
}

export function activate_searchBar(){
    $('#search_box').removeAttr('disabled');
    $('#search_button').removeAttr('disabled');
    $('#search_bar').css('display','flex');
}

export function click_redirect_href(){
    
    $('#redirect_user_href')[0].click();
}


