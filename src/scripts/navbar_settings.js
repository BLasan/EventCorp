export function prevent_handeling(){
    $(document).click('#login',function(e){
        e.preventDefault();
    });

    $(document).click('#signup',function(e){
        e.preventDefault();
    })
}