
export function disable_room_id(){
   // alert('1')
    $(document).click('#room_id',function(e){
        e.preventDefault();
    })
}

export function disable_open_chat(){
   // alert('2')
    $(document).click('#open_chat_selected',function(e){
        e.preventDefault();
    })
}

export function disable_close_chat(){
   // alert('3')
    $(document).click('#close_chat_href',function(e){
        e.preventDefault();
    })
}

export function disable_drop_down(){

    $(document).on('click','#profileDropDown',function(e){
       // e.preventDefault();
       
        $("#menuList").removeClass("hiding")
        // $('#menuList').removeAttr('class');
        // $('#menuList').attr('class','dropdown-menu');
        // $('#menuList').attr('class','dropdown-menu-right');
        // $('#menuList').attr('class','show');
        // $('#menuList').attr('style','background-color:white');
    });

   
}

export function previous_mode(){
    $('#profileDropDown').on('click',function(e){
        $("#menuList").removeClass("hiding")
    })
}

