export function redirect_to(role){

    // var role=$('#user_role').val();
     alert(role)
     
    if(role=='artist'){
        $('#redirect_link').attr('href','/artist-home');
       // $('#redirect_link')[0].click();
    }

    else if(role=='admin'){
        $('#redirect_link').attr('href','/dashboard');
       // $('#redirect_link')[0].click();
    }

    else if(role=='organizer'){
        $('#redirect_link').attr('href','/organizer-home');
       // $('#redirect_link')[0].click();
    }

    else if(role=='supplier'){
        $('#redirect_link').attr('href','/supplier-home');
       // $('#redirect_link')[0].click();
    }

    else if(role=='venue_owner'){
        $('#redirect_link').attr('href','/venue_owner-home');
       // $('#redirect_link')[0].click();
    }

    $('#redirect_link')[0].click();

    
}


export function navigate_to_login(){
    $("#login_route")[0].click();
}

export function navigate_to_signup(){
    $("#signup_route")[0].click();
}

export function redirect_to_login(){
    $('#redirect_to_login')[0].click();
}


// exports.navigate_to=function(){
//     $('#navigate_to_profile')[0].click();
// }