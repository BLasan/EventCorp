function deactivate_searchBar(){

    $('#search_box').attr('disabled','disabled');
    $('#search_button').attr('disabled','disabled')
}

function activate_searchBar(){
    $('#search_box').removeAttr('disabled');
    $('#search_button').removeAttr('disabled')
}